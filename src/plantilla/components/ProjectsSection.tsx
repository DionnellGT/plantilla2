import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectsSectionData } from "../data/interfaces";

interface ProjectsSectionProps {
  data: ProjectsSectionData;
  onSelectProject: (project: Project) => void;
}

const INITIAL_VISIBLE = 3;

export const ProjectsSection = ({ data, onSelectProject }: ProjectsSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? data.projects : data.projects.slice(0, INITIAL_VISIBLE);
  const hasMore = data.projects.length > INITIAL_VISIBLE;

  return (
    <section
      className="py-stack-lg px-margin-mobile md:px-gutter bg-surface-container-low scroll-mt-20"
      id="proyectos"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-stack-lg fade-and-slide-up visible">
          <span className="font-label-md text-label-md font-semibold text-primary uppercase tracking-widest mb-2 block">
            {data.eyebrow}
          </span>
          <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface mb-stack-sm">
            {data.title}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={onSelectProject}
            />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="border-2 border-primary text-primary px-8 py-3 rounded-full font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all"
            >
              {showAll ? "Mostrar menos proyectos" : "Mostrar más proyectos"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
