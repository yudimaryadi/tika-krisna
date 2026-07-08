"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

function GalleryTile({
  src,
  index,
  delay,
  onClick,
  className = "",
}: {
  src: string;
  index: number;
  delay: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <AnimatedSection delay={delay} className={className}>
      <button
        onClick={onClick}
        className="relative w-full h-full overflow-hidden group block"
      >
        <Image
          src={src}
          alt={`Foto ${index + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="33vw"
          quality={80}
          loading={index < 3 ? undefined : "lazy"}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
      </button>
    </AnimatedSection>
  );
}

// Chunks the gallery into 3-photo mosaic blocks (1 featured tile spanning a 2x2 area +
// 2 small tiles filling the rest of a 3-col x 2-row grid, alternating sides). Every block
// uses explicit grid spans instead of relying on browser auto-placement — that's what
// previously left gaps. Any remainder (<3 photos) falls back to plain equal squares.
function buildMosaicBlocks(gallery: string[]) {
  const blocks: { photos: string[]; startIndex: number }[] = [];
  let i = 0;
  for (; i + 3 <= gallery.length; i += 3) {
    blocks.push({ photos: gallery.slice(i, i + 3), startIndex: i });
  }
  return { blocks, remainder: gallery.slice(i), remainderStart: i };
}

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const slides = weddingData.gallery.map((src) => ({ src }));
  const { blocks, remainder, remainderStart } = buildMosaicBlocks(weddingData.gallery);

  return (
    <section className="relative overflow-hidden pb-16">
      {/* Uses global video background */}
      <div className="absolute inset-0 bg-black/55" />

      {/* GALLERY watermark title */}
      <AnimatedSection className="relative z-10 px-4 pt-10 pb-2">
        <h2
          className="font-display italic font-bold text-white/[0.06] leading-none select-none text-center"
          style={{ fontSize: "clamp(48px, 14vw, 105px)" }}
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

      {/* Mosaic gallery: repeating blocks of 1 featured tile (2x2) + 2 small tiles,
          alternating sides. Each block is a self-contained 3x2 grid — fully covered by
          explicit spans, so there's no auto-placement gap to worry about. */}
      <div className="relative z-10 space-y-0.5 px-0.5">
        {blocks.map((block, b) => {
          const isMirrored = b % 2 === 1;
          const featuredPos = isMirrored
            ? "col-start-2 row-start-1"
            : "col-start-1 row-start-1";
          const smallPositions = isMirrored
            ? ["col-start-1 row-start-1", "col-start-1 row-start-2"]
            : ["col-start-3 row-start-1", "col-start-3 row-start-2"];

          return (
            <div key={block.startIndex} className="grid grid-cols-3 grid-rows-2 gap-0.5 aspect-[3/2]">
              <GalleryTile
                src={block.photos[0]}
                index={block.startIndex}
                delay={Math.min(b * 0.05, 0.3)}
                onClick={() => setIndex(block.startIndex)}
                className={`col-span-2 row-span-2 ${featuredPos}`}
              />
              <GalleryTile
                src={block.photos[1]}
                index={block.startIndex + 1}
                delay={Math.min(b * 0.05 + 0.05, 0.35)}
                onClick={() => setIndex(block.startIndex + 1)}
                className={smallPositions[0]}
              />
              <GalleryTile
                src={block.photos[2]}
                index={block.startIndex + 2}
                delay={Math.min(b * 0.05 + 0.1, 0.4)}
                onClick={() => setIndex(block.startIndex + 2)}
                className={smallPositions[1]}
              />
            </div>
          );
        })}

        {remainder.length > 0 && (
          <div className="grid grid-cols-3 gap-0.5">
            {remainder.map((src, i) => (
              <GalleryTile
                key={src}
                src={src}
                index={remainderStart + i}
                delay={Math.min(i * 0.05, 0.3)}
                onClick={() => setIndex(remainderStart + i)}
                className="aspect-square"
              />
            ))}
          </div>
        )}
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
