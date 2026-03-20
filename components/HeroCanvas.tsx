"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// GLSL Shaders
// ---------------------------------------------------------------------------

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

// ---- Simplex 3D Noise ----
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// ---- FBM (Fractal Brownian Motion) ----
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 3; i++) {
    value += amplitude * snoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 st = uv;
  st.x *= aspect;

  float t = uTime * 0.15;

  // Mouse influence — gentle warp of the coordinate space
  vec2 mouse = uMouse * 0.08;
  st += mouse * smoothstep(0.0, 1.5, 1.0 - length(uv - 0.5));

  // Primary noise field (large scale flowing shapes)
  float n1 = fbm(vec3(st * 1.4, t));

  // Secondary noise for variation (offset in time/space)
  float n2 = fbm(vec3(st * 2.2 + 3.7, t * 1.3 + 10.0));

  // Tertiary fine detail layer
  float n3 = snoise(vec3(st * 3.5 + n1 * 0.5, t * 0.8 + 5.0));

  // Domain warping — feed noise back into itself for organic shapes
  float warp = fbm(vec3(st * 1.8 + vec2(n1 * 0.4, n2 * 0.4), t * 0.7));

  // Color palette
  vec3 deepIndigo    = vec3(0.102, 0.102, 0.243);  // #1a1a3e
  vec3 electricBlue  = vec3(0.310, 0.549, 1.000);  // #4f8cff
  vec3 purple        = vec3(0.545, 0.361, 0.965);  // #8b5cf6
  vec3 darkBase      = vec3(0.039, 0.039, 0.071);  // #0a0a12
  vec3 accentCyan    = vec3(0.200, 0.600, 0.900);  // subtle accent

  // Build color from noise layers
  vec3 color = darkBase;

  // Large smooth blobs of indigo
  float blend1 = smoothstep(-0.3, 0.6, warp);
  color = mix(color, deepIndigo, blend1 * 0.9);

  // Electric blue aurora streaks
  float blend2 = smoothstep(0.0, 0.7, n1 + n3 * 0.3);
  color = mix(color, electricBlue, blend2 * 0.45);

  // Purple glow regions
  float blend3 = smoothstep(-0.1, 0.8, n2);
  color = mix(color, purple, blend3 * 0.35);

  // Bright accent highlights where noises converge
  float highlight = smoothstep(0.4, 0.9, n1 * n2 + 0.5);
  color = mix(color, accentCyan, highlight * 0.2);

  // Subtle bright edge / glow on noise ridges
  float ridge = abs(n1 - n2);
  float ridgeGlow = smoothstep(0.0, 0.15, ridge) * smoothstep(0.5, 0.15, ridge);
  color += electricBlue * ridgeGlow * 0.15;

  // Vignette — darken edges for focus
  float vignette = 1.0 - smoothstep(0.3, 1.2, length((uv - 0.5) * vec2(1.2, 1.0)));
  color *= mix(0.5, 1.0, vignette);

  // Subtle overall brightness modulation
  color *= 1.1;

  gl_FragColor = vec4(color, 1.0);
}
`;

// ---------------------------------------------------------------------------
// Shader Plane — full-screen quad with animated shader
// ---------------------------------------------------------------------------

function ShaderPlane({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    }),
    []
  );

  // Handle window resize
  useEffect(() => {
    const onResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [uniforms]);

  useFrame((_state, delta) => {
    const mat = meshRef.current?.material as THREE.ShaderMaterial | undefined;
    if (!mat) return;

    mat.uniforms.uTime.value += delta;

    // Lerp mouse for smooth following
    const lerpFactor = 1.0 - Math.pow(0.05, delta);
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * lerpFactor;
    mat.uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// HeroCanvas — the Canvas wrapper, default-exported for dynamic import
// ---------------------------------------------------------------------------

const cameraProps = { position: [0, 0, 1] as const };

export default function HeroCanvas({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      camera={cameraProps}
    >
      <ShaderPlane mouse={mouse} />
    </Canvas>
  );
}
