"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function LoveStory() {
  return (
    <section className="relative overflow-hidden">
      {/* Uses global video background */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-lg mx-auto px-6 py-20">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display italic text-3xl sm:text-4xl text-white leading-snug">
            The Journey of Two Souls in Love
          </h2>
          <div className="w-10 h-px bg-white/30 mx-auto mt-5" />
        </AnimatedSection>

        <div className="space-y-0">
          {weddingData.loveStory.map((story, i) => (
            <AnimatedSection key={i} delay={0.1}>
              <div className="text-center mb-5">
                <p className="font-display italic text-2xl sm:text-3xl text-white">
                  {story.month} {story.year}
                </p>
              </div>

              <div className="px-4 mb-8">
                <p className="font-display italic text-sm sm:text-base text-white/80 leading-relaxed text-center">
                  &ldquo;{story.description}&rdquo;
                </p>
              </div>

              <div className="relative w-full aspect-[4/3] overflow-hidden mb-16">
                <Image
                  src={story.photo}
                  alt={story.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
