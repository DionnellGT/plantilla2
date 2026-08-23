import { MapPin, ChevronDown } from "lucide-react";
import type { HeroData } from "../data/interfaces";

interface HeroSectionProps {
  data: HeroData;
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
      id="inicio"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${data.backgroundImage}")` }}
        role="img"
        aria-label={data.backgroundAlt}
      />
      {/* Degradado horizontal: texto legible a la izquierda, imagen nítida a la derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/75 md:via-surface/55 to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-gutter">
        <div className="max-w-xl text-left fade-and-slide-up visible">
          <div className="flex items-center gap-2 mb-stack-sm">
            <MapPin className="text-tertiary w-5 h-5 shrink-0" />
            <span className="font-label-md text-label-md font-semibold text-tertiary uppercase tracking-widest">
              {data.eyebrow}
            </span>
          </div>

          <h1 className="font-display-lg font-bold text-headline-lg-mobile md:text-display-lg text-primary mb-stack-md">
            {data.title}
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-stack-lg">
            {data.descripcion}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md font-semibold soft-shadow hover:bg-primary-container transition-all hover:scale-105"
              href={data.ctaHref}
            >
              {data.ctaLabel}
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-4 rounded-full font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all"
              href={data.secondaryCtaHref}
            >
              {data.secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
