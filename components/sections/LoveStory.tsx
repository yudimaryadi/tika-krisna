"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function LoveStory() {
  return (
    <section className="py-20 bg-cream/80 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-tag">Perjalanan Cinta</span>
          <h2 className="section-title">Our Love Story</h2>
          <div className="divider" />
        </AnimatedSection>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-200 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {weddingData.loveStory.map((story, i) => {
              const isLeft = i % 2 === 0;
              return (
                <AnimatedSection
                  key={i}
                  delay={0.1}
                  direction={isLeft ? "left" : "right"}
                >
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                      !isLeft ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="w-full md:flex-1">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={story.photo}
                          alt={story.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 45vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex flex-col items-center flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-gold-400 border-4 border-cream shadow-md" />
                    </div>

                    {/* Text */}
                    <div
                      className={`w-full md:flex-1 ${
                        isLeft ? "md:text-left" : "md:text-right"
                      } text-center md:text-inherit`}
                    >
                      <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-500 block mb-2">
                        {story.month} {story.year}
                      </span>
                      <h3 className="font-display text-3xl text-primary-700 mb-3">
                        {story.title}
                      </h3>
                      <p className="font-body text-sm text-gray-600 leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
