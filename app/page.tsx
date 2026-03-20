import HeroScene from "@/components/HeroScene";
import ProjectGrid from "@/components/ProjectGrid";

const pillClass =
  "px-4 py-2 text-sm rounded-lg border border-white/10 text-foreground/90 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-colors";

const skills = [
  "Brand Identity",
  "UI/UX Design",
  "Web Development",
  "3D & Motion",
  "Creative Direction",
  "Typography",
];

const tools = [
  "Figma",
  "After Effects",
  "Blender",
  "React",
  "Three.js",
  "TypeScript",
];

export default function Home() {
  return (
    <>
      <HeroScene />
      <ProjectGrid />

      {/* About */}
      <section id="about" className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              About
            </h2>
            <div className="h-1 w-12 bg-accent rounded-full mt-4" />
          </div>
          <div className="grid md:grid-cols-5 gap-12 md:gap-16">
            <div className="md:col-span-2 space-y-5 text-foreground/80 text-lg leading-relaxed">
              <p>
                I&apos;m Sid Mehta — a designer and creative developer focused on
                building memorable digital experiences.
              </p>
              <p>
                I work at the intersection of design, technology, and
                storytelling. From brand systems to interactive 3D, I care about
                craft, clarity, and making things that feel alive.
              </p>
            </div>
            <div className="md:col-span-3 space-y-8">
              <div>
                <h3 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
                  What I Do
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span key={skill} className={pillClass}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {tools.map((tool) => (
                    <span key={tool} className={pillClass}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.06] blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-5">
            Let&apos;s Work Together
          </h2>
          <p className="text-foreground/50 text-lg mb-10 leading-relaxed">
            Have a project in mind or just want to say hello?
            <br />
            I&apos;d love to hear from you.
          </p>
          <a
            href="mailto:hello@sidmehta.com"
            className="inline-block px-10 py-4 rounded-full bg-accent hover:bg-accent-hover text-white font-medium text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105"
          >
            Say Hello
          </a>
        </div>
      </section>
    </>
  );
}
