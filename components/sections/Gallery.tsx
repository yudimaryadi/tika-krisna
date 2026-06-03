"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const slides = weddingData.gallery.map((src) => ({ src }));

  return (
    <section className="relative overflow-hidden pb-16">
      {/* Uses global video background */}
      <div className="absolute inset-0 bg-black/55" />

      {/* GALLERY watermark title */}
      <AnimatedSection className="relative z-10 px-4 pt-10 pb-2">
        <h2
          className="font-display italic font-bold text-white/[0.06] leading-none select-none text-center"
          style={{ fontSize: "clamp(72px, 25vw, 140px)" }}
        >
          GALLERY
        </h2>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <p className="font-display italic text-3xl sm:text-4xl text-white">Gallery</p>
          <div className="w-8 h-px bg-white/30 mx-auto mt-3" />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="relative z-10 text-center px-8 mb-6 mt-8">
        <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
          Setiap momen adalah kenangan yang tak ternilai, diabadikan dalam setiap foto indah ini.
        </p>
      </AnimatedSection>

      {/* Top row: 3-column */}
      <div className="relative z-10 grid grid-cols-3 gap-0.5 px-0.5 mb-0.5">
        {weddingData.gallery.slice(0, 3).map((src, i) => (
          <AnimatedSection key={src} delay={i * 0.05}>
            <button
              onClick={() => setIndex(i)}
              className="relative w-full aspect-square overflow-hidden group block"
            >
              <Image
                src={src}
                alt={`Foto ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="33vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </button>
          </AnimatedSection>
        ))}
      </div>

      {/* Main grid: 2-column */}
      <div className="relative z-10 grid grid-cols-2 gap-0.5 px-0.5">
        {weddingData.gallery.slice(3).map((src, i) => {
          const actualIndex = i + 3;
          const isFull = i === 1 || i === 6 || i === 11;
          return (
            <AnimatedSection
              key={src}
              delay={Math.min(i * 0.03, 0.2)}
              className={isFull ? "col-span-2" : ""}
            >
              <button
                onClick={() => setIndex(actualIndex)}
                className={`relative w-full overflow-hidden group block ${
                  isFull ? "aspect-[16/9]" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Foto ${actualIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={isFull ? "100vw" : "50vw"}
                  quality={80}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              </button>
            </AnimatedSection>
          );
        })}
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.97)" } }}
      />
    </section>
  );
}
