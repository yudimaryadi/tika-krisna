"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function VideoSection() {
  return (
    <section className="py-16 sm:py-20 bg-cream/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <span className="section-tag">Momen Spesial</span>
          <h2 className="section-title">Video Kami</h2>
          <div className="divider" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative border border-gold-200 shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-7 h-7 sm:w-8 sm:h-8 border-t-2 border-l-2 border-gold-400 z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-7 h-7 sm:w-8 sm:h-8 border-t-2 border-r-2 border-gold-400 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-7 h-7 sm:w-8 sm:h-8 border-b-2 border-l-2 border-gold-400 z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 border-b-2 border-r-2 border-gold-400 z-10 pointer-events-none" />
            <div className="aspect-video">
              <iframe
                src={`${weddingData.video}?rel=0&modestbranding=1`}
                title="Video Tika & Krisna"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
