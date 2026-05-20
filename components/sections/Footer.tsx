"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function Footer() {
  return (
    <footer className="relative py-24 bg-petal/80 overflow-hidden">
      {/* Background tint photo */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src={weddingData.gallery[22]}
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
      </div>

      <div className="relative max-w-xl mx-auto px-8 text-center">
        <AnimatedSection>
          <p className="arabic text-2xl text-gold-500 mb-6">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="divider mb-8" />
          <p className="font-body text-sm text-gray-600 leading-relaxed">
            {weddingData.quotes.closing}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="my-10">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-300/60" />
            <h2 className="font-script text-6xl text-primary-600">
              {weddingData.couple.bride.nickname}
            </h2>
            <span className="font-display text-2xl text-gold-400">&</span>
            <h2 className="font-script text-6xl text-primary-600">
              {weddingData.couple.groom.nickname}
            </h2>
            <div className="h-px w-12 bg-gold-300/60" />
          </div>
          <p className="font-display text-sm tracking-[0.2em] uppercase text-gray-500 mt-3">
            19 Juni 2026
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.45}>
          <div className="divider mt-8" />
          <p className="font-body text-[10px] tracking-widest uppercase text-gray-400 mt-6">
            Made by iduyy dev ✦ {new Date().getFullYear()}
          </p>
        </AnimatedSection>
      </div>
    </footer>
  );
}
