export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  color: string;
  year: string;
};

const projects: Project[] = [
  {
    slug: "luminance-brand-system",
    title: "Luminance Brand System",
    description:
      "A comprehensive visual identity for a next-generation lighting company. The brand system spans logo design, typography selection, color palettes, and a complete set of guidelines for print and digital applications.",
    category: "Branding",

    color: "#f59e0b",
    year: "2025",
  },
  {
    slug: "aether-health-app",
    title: "Aether Health App",
    description:
      "End-to-end product design for a wellness platform that combines biometric tracking with mindfulness exercises. Focused on creating an intuitive, calming user experience across iOS and Android.",
    category: "UI/UX",

    color: "#06b6d4",
    year: "2025",
  },
  {
    slug: "solstice-title-sequence",
    title: "Solstice Title Sequence",
    description:
      "A cinematic 3D title sequence for an independent film festival. Blending procedural geometry with dynamic camera movement to evoke the passage of time and the interplay of light and shadow.",
    category: "3D & Motion",

    color: "#a855f7",
    year: "2024",
  },
  {
    slug: "forma-architecture-studio",
    title: "Forma Architecture Studio",
    description:
      "A refined portfolio website for a boutique architecture firm. Emphasizing whitespace, large-format imagery, and seamless page transitions to mirror the studio's design philosophy.",
    category: "Web Design",

    color: "#ec4899",
    year: "2024",
  },
  {
    slug: "noctis-coffee-roasters",
    title: "Noctis Coffee Roasters",
    description:
      "Full identity design for a specialty coffee brand, including wordmark, packaging system, merchandise, and environmental graphics for their flagship roastery and tasting room.",
    category: "Identity",

    color: "#10b981",
    year: "2023",
  },
  {
    slug: "parallax-editorial-series",
    title: "Parallax Editorial Series",
    description:
      "Art direction for a limited-run print publication exploring the intersection of technology and culture. Oversaw photography, illustration commissioning, layout design, and print production.",
    category: "Art Direction",

    color: "#ef4444",
    year: "2023",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
