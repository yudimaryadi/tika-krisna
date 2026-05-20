"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

// Index foto yang tampil besar (span 2 kolom)
const FEATURED = new Set([0, 6, 13, 20]);

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const slides = weddingData.gallery.map((src) => ({ src }));

  return (
    <section className="py-16 sm:py-20 bg-petal/80">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <AnimatedSection className="text-center mb-10 sm:mb-12 px-4">
          <span className="section-tag">Momen Berharga</span>
          <h2 className="section-title">Galeri Foto</h2>
          <div className="divider" />
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-1.5">
          {weddingData.gallery.map((src, i) => {
            const isFeatured = FEATURED.has(i);
            return (
              <AnimatedSection
                key={src}
                delay={Math.min(i * 0.02, 0.25)}
                className={isFeatured ? "col-span-2 row-span-2" : ""}
              >
                <button
                  onClick={() => setIndex(i)}
                  className="relative w-full overflow-hidden group block aspect-square"
                >
                  <Image
                    src={src}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={80}
                    loading={i < 8 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQQBBAMAAAAAAAAAAAAAAQIDBAUSERMhMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ame1mstPqtLTMxJbWlKSlCQAlI8AAbAD5g4WJuHuKbU3EcDTKHErQ4oFKknYg+CDg4P/Z"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </button>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
      />
    </section>
  );
}
