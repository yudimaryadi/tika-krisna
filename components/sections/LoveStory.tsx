"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function LoveStory() {
  return (
    <section className="relative overflow-hidden">
      {/* Uses global video background */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-lg mx-auto px-6 py-20">
        <AnimatedSection className="text-center mb-14">
          <p className="font-script text-4xl sm:text-5xl text-white leading-tight">Our</p>
          <h2 className="font-display italic text-2xl sm:text-3xl text-white/80 -mt-1">Story</h2>
          <div className="w-10 h-px bg-white/30 mx-auto mt-5" />
        </AnimatedSection>

        <div className="space-y-6">
          {weddingData.loveStory.map((paragraph, i) => (
            <AnimatedSection key={i} delay={Math.min(i * 0.1, 0.4)}>
              <p className="font-display italic text-sm sm:text-base text-white/80 leading-relaxed text-center">
                {paragraph}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-14">
          <p className="font-display italic text-2xl sm:text-3xl text-white">
            {weddingData.couple.groom.nickname} &amp; {weddingData.couple.bride.nickname}
          </p>
          <p className="font-body text-xs text-white/60 mt-2">
            {weddingData.loveStoryClosing}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
