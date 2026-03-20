import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Sid Mehta`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      {/* Hero */}
      <section
        className="relative flex items-end justify-center overflow-hidden"
        style={{ minHeight: "60vh" }}
      >
        {/* Multi-layer gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, ${project.color}44 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, ${project.color}22 0%, transparent 50%),
              linear-gradient(to bottom, var(--background) 0%, transparent 20%, transparent 70%, var(--background) 100%)
            `,
          }}
        />

        <div className="relative z-10 text-center px-6 pb-16 pt-32 w-full max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground transition-colors mb-12"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-current">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to projects
          </Link>

          <div className="flex items-center justify-center gap-4 mb-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border"
              style={{
                borderColor: `${project.color}55`,
                color: project.color,
                backgroundColor: `${project.color}15`,
              }}
            >
              {project.category}
            </span>
            <span className="text-foreground/30 font-mono text-sm">{project.year}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xl leading-relaxed text-foreground/80 mb-12">
          {project.description}
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-foreground/40 font-mono text-sm">
            Full case study coming soon.
          </p>
        </div>

        {/* Bottom nav */}
        <div className="mt-20 pt-8 border-t border-white/5">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-current">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to all projects
          </Link>
        </div>
      </section>
    </article>
  );
}
