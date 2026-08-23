import { MapPin, ArrowRight } from "lucide-react";
import type { Project } from "../data/interfaces";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

const BADGE_STYLES = [
  "bg-tertiary-fixed text-on-tertiary-fixed",
  "bg-primary-fixed text-on-primary-fixed",
  "bg-secondary-container text-on-secondary-container",
];

export const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => {
  const badgeClass = BADGE_STYLES[index % BADGE_STYLES.length];

  return (
    <div
      className="group bg-surface-container-lowest rounded-[20px] overflow-hidden soft-shadow card-hover cursor-pointer fade-and-slide-up visible"
      style={project.transitionDelayMs ? { transitionDelay: `${project.transitionDelayMs}ms` } : undefined}
      onClick={() => onSelect(project)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          alt={project.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={project.image}
        />
        {project.badge && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-label-md font-semibold ${
              project.badgeColor ? "" : badgeClass
            }`}
            style={project.badgeColor ? { backgroundColor: project.badgeColor, color: "#fff" } : undefined}
          >
            {project.badge}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-headline-md text-xl font-semibold text-on-surface mb-2">
          {project.title}
        </h3>

        {project.ubicacion && (
          <p className="flex items-center gap-1 text-sm text-on-surface-variant mb-4">
            <MapPin className="w-4 h-4" />
            {project.ubicacion}
          </p>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
          <div>
            <p className="text-xs text-on-surface-variant">Desde</p>
            <p className="font-headline-md text-lg font-semibold text-primary">{project.price}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center group-hover:bg-primary transition-colors">
            <ArrowRight className="w-4 h-4 text-primary group-hover:text-on-primary transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
