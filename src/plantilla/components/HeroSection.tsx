import { MapPin, ArrowDown } from "lucide-react";
import type { HeroData } from "../data/interfaces";

interface HeroSectionProps {
  data: HeroData;
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      id="inicio"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${data.backgroundImage}")` }}
        role="img"
        aria-label={data.backgroundAlt}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

      <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto fade-and-slide-up visible">
        <div className="flex items-center justify-center gap-2 mb-stack-sm">
          <MapPin className="text-tertiary w-5 h-5" />
          <span className="font-label-md text-label-md text-tertiary uppercase tracking-widest">
            {data.eyebrow}
          </span>
        </div>

        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-stack-md">
          {data.title}
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
          {data.descripcion}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md soft-shadow hover:bg-primary-container transition-all hover:scale-105"
            href={data.ctaHref}
          >
            {data.ctaLabel}
          </a>
          <a
            className="w-full sm:w-auto border-2 border-on-surface/20 text-on-surface px-8 py-4 rounded-full font-label-md text-label-md hover:border-primary hover:text-primary transition-all"
            href={data.secondaryCtaHref}
          >
            {data.secondaryCtaLabel}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-on-surface/50 w-6 h-6" />
      </div>
    </section>
  );
};
