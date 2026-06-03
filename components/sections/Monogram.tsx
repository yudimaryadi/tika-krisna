"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function Monogram() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Global video background — hanya tambah overlay gelap */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 text-center px-8 max-w-sm mx-auto">
        {/* TK Monogram */}
        <AnimatedSection>
          <div
            className="font-display italic text-white leading-none select-none mb-8 mx-auto"
            style={{
              fontSize: "clamp(100px, 30vw, 180px)",
              letterSpacing: "-0.06em",
            }}
          >
            <span className="inline-block">K</span>
            <span className="inline-block -ml-[0.12em]">T</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="w-10 h-px bg-white/30 mx-auto mb-8" />
          <blockquote className="text-center">
            <p className="font-display italic text-base sm:text-lg text-white/90 leading-relaxed">
              &ldquo;{weddingData.quotes.quranTranslation}&rdquo;
            </p>
            <cite className="font-body text-[10px] tracking-[0.35em] uppercase text-white/50 not-italic mt-4 block">
              {weddingData.quotes.quranSource}
            </cite>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
}
