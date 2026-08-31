import { Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { TestimoniosSectionData } from "../data/interfaces";

interface TestimoniosSectionProps {
  data: TestimoniosSectionData;
}

export const TestimoniosSection = ({ data }: TestimoniosSectionProps) => {
  const [visibleCards, setVisibleCards] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) setVisibleCards(4);
      else if (window.innerWidth >= 768) setVisibleCards(3);
      else setVisibleCards(2);
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, data.testimonios.length - visibleCards);
  const hasCarousel = data.testimonios.length > visibleCards;

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section
      className="py-stack-lg px-margin-mobile md:px-gutter max-w-[1280px] mx-auto scroll-mt-2"
      id="testimonios"
    >
      <div className="text-center max-w-2xl mx-auto mb-stack-lg fade-and-slide-up visible">
        <span className="font-label-md text-label-md font-semibold text-primary uppercase tracking-widest mb-2 block">
          {data.eyebrow}
        </span>
        <h2 className="font-headline-lg text-headline-lg font-semibold text-on-surface mb-stack-sm">
          {data.title}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">{data.subtitle}</p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex} * ((100% + 2rem) / ${visibleCards})))`,
            }}
          >
            {data.testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="shrink-0 w-[calc((100%-2rem)/2)] md:w-[calc((100%-4rem)/3)] lg:w-[calc((100%-6rem)/4)]"
          >
            <div
              className="w-full h-full bg-surface-container-low rounded-[24px] overflow-hidden soft-shadow fade-and-slide-up visible"
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
              <p className="font-label-md text-label-md font-semibold text-on-surface">
                — {testimonio.authorName}
              </p>
            </div>
            </div>
          </div>
        ))}
          </div>
        </div>

        {hasCarousel && (
          <>
            <button type="button" onClick={handlePrevious} disabled={currentIndex === 0}
              aria-label="Testimonios anteriores"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-slate-gray/20 shadow-md flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={handleNext} disabled={currentIndex === maxIndex}
              aria-label="Siguiente testimonio"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-slate-gray/20 shadow-md flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button key={index} type="button" onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir al grupo de testimonios ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${currentIndex === index ? "w-6 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
