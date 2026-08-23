import { Star, BadgeCheck, TreePine } from "lucide-react";
import type { AboutData } from "../data/interfaces";

interface AboutSectionProps {
  data: AboutData;
}

const FEATURE_CARDS = [
  {
    icon: BadgeCheck,
    title: "Asesoría Legal",
    description: "Contratos y transferencias 100% seguras.",
  },
  {
    icon: TreePine,
    title: "Conocimiento Local",
    description: "Años recorriendo cada rincón de la zona.",
  },
];

export const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section
      className="py-stack-lg px-margin-mobile md:px-gutter max-w-[1280px] mx-auto scroll-mt-20"
      id="sobre-mi"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative fade-and-slide-up visible">
          <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary-fixed rounded-full blur-3xl opacity-40" />
          <div className="relative rounded-[32px] overflow-hidden soft-shadow aspect-[4/5]">
            <img
              src={data.image}
              alt={data.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {data.featuredQuote && (
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-surface-container-lowest rounded-2xl p-5 soft-shadow max-w-[240px] hidden sm:block">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="text-secondary w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic">
                "{data.featuredQuote}"
              </p>
            </div>
          )}
        </div>

        <div className="fade-and-slide-up visible" style={{ transitionDelay: "100ms" }}>
          <span className="font-label-md text-label-md font-semibold text-primary uppercase tracking-widest mb-2 block">
            {data.eyebrow}
          </span>
          <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface mb-stack-md">
            {data.title}
          </h2>

          {data.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index < data.paragraphs.length - 1
                  ? "font-body-md text-body-md text-on-surface-variant mb-stack-sm"
                  : "font-body-md text-body-md text-on-surface-variant mb-stack-md"
              }
            >
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-4">
            {FEATURE_CARDS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-surface-container rounded-2xl p-5">
                <Icon className="text-primary w-6 h-6 mb-2" />
                <h3 className="font-label-md text-label-md font-semibold text-on-surface mb-1">
                  {title}
                </h3>
                <p className="text-sm text-on-surface-variant">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
