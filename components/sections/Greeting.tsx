"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function Greeting() {
  return (
    <section className="py-24 bg-cream/80">
      <div className="max-w-xl mx-auto px-8 text-center">
        <AnimatedSection>
          <p className="arabic text-3xl text-gold-500 mb-8">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="divider" />
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <blockquote className="mt-8 mb-2">
            <p className="font-display text-lg text-primary-700 leading-relaxed italic">
              &ldquo;{weddingData.quotes.quranTranslation}&rdquo;
            </p>
            <cite className="font-body text-xs tracking-wider text-gold-500 not-italic mt-3 block">
              {weddingData.quotes.quranSource}
            </cite>
          </blockquote>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="divider mt-8" />
          <p className="font-display text-base text-gray-600 leading-relaxed mt-8">
            Dengan memohon rahmat dan ridho Allah SWT,
            <br />
            kami mengundang Bapak/Ibu/Saudara/i untuk hadir
            <br />
            menyaksikan hari istimewa kami.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
