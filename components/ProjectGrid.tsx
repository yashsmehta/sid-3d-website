import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectGrid() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="pt-24 pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              Selected Work
            </h2>
          </div>
          <p className="text-foreground/30 text-sm font-mono hidden md:block">{projects.length} projects</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
