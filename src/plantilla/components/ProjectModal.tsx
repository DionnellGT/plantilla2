import { MapPin, CheckCircle2, RotateCw, Map as MapIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "../data/interfaces";

interface ProjectModalProps {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export const ProjectModal = ({ project, onOpenChange }: ProjectModalProps) => {
  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-4xl">
        {project && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full min-h-[280px]">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-cover"
              />
              {typeof project.lotesDisponibles === "number" && (
                <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 px-4 py-2 rounded-full">
                  <p className="text-sm font-label-md font-semibold text-on-surface">
                    {project.lotesDisponibles} lote(s) disponible(s)
                  </p>
                </div>
              )}
            </div>

            <div className="p-8">
              {project.ubicacion && (
                <p className="flex items-center gap-1 text-sm text-on-surface-variant mb-2">
                  <MapPin className="w-4 h-4" />
                  {project.ubicacion}
                </p>
              )}

              <DialogTitle className="font-headline-lg text-2xl font-semibold text-on-surface mb-2">
                {project.title}
              </DialogTitle>

              <p className="font-headline-md text-xl font-semibold text-primary mb-4">
                {project.price}
              </p>

              {project.descripcion && (
                <p className="text-on-surface-variant mb-6">{project.descripcion}</p>
              )}

              {project.caracteristicas.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {project.caracteristicas.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-on-surface">
                      <CheckCircle2 className="text-primary w-[18px] h-[18px] shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {(project.link360Maps || project.linkGoogleMaps) && (
                <div className="flex gap-3">
                  {project.link360Maps && (
                    <a
                      href={project.link360Maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary text-on-primary py-3 rounded-full text-center font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCw className="w-4 h-4" />
                      Ver Tour 360°
                    </a>
                  )}
                  {project.linkGoogleMaps && (
                    <a
                      href={project.linkGoogleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-primary text-primary py-3 rounded-full text-center font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <MapIcon className="w-4 h-4" />
                      Ver en Maps
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
