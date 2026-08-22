import { Play, Quote } from "lucide-react";
import type { TestimoniosSectionData } from "../data/interfaces";

interface TestimoniosSectionProps {
  data: TestimoniosSectionData;
}

export const TestimoniosSection = ({ data }: TestimoniosSectionProps) => {
  return (
    <section
      className="py-stack-lg px-margin-mobile md:px-gutter max-w-[1280px] mx-auto scroll-mt-20"
      id="testimonios"
    >
      <div className="text-center max-w-2xl mx-auto mb-stack-lg fade-and-slide-up visible">
        <span className="font-label-md text-label-md text-primary uppercase tracking-widest mb-2 block">
          {data.eyebrow}
        </span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">
          {data.title}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">{data.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="bg-surface-container-low rounded-[24px] overflow-hidden soft-shadow fade-and-slide-up visible"
            style={
              testimonio.transitionDelayMs
                ? { transitionDelay: `${testimonio.transitionDelayMs}ms` }
                : undefined
            }
          >
            <div className="relative aspect-video bg-surface-variant group">
              {testimonio.media ? (
                testimonio.tipoMedia === "video" ? (
                  <video src={testimonio.media} controls className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={testimonio.media}
                    alt={testimonio.authorName}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Quote className="text-on-surface-variant/30 w-10 h-10" />
                </div>
              )}

              {testimonio.tipoMedia === "video" && (
                <div className="absolute inset-0 bg-on-surface/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-surface-container-lowest/90 flex items-center justify-center">
                    <Play className="text-primary w-7 h-7 fill-current" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              {testimonio.quote && (
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-4">
                  "{testimonio.quote}"
                </p>
              )}
              <p className="font-label-md text-label-md text-on-surface">
                — {testimonio.authorName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
