"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

const BRIDE_PHOTOS = [
  "/foto/tika.jpg",
  "/foto/IMG_3554.jpg",
  "/foto/IMG_3380.jpg",
];

export default function BrideSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % BRIDE_PHOTOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { bride } = weddingData.couple;

  return (
    <section className="relative min-h-screen flex items-stretch py-2 px-2">
      {/* Global video tetap sebagai bg section */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Card foto dengan celah sisi */}
      <div className="relative flex-1 overflow-hidden">
        {/* Slide transition */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 1 }),
              center: { x: "0%", opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 1 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={BRIDE_PHOTOS[current]}
              alt="The Bride"
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority={current === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />
          </motion.div>
        </AnimatePresence>

        {/* THE BRIDE — pojok kiri atas */}
        <div className="absolute top-5 left-5 z-10 leading-none">
          <p className="font-body text-[9px] tracking-[0.5em] uppercase text-white/70">THE</p>
          <p
            className="font-display italic font-bold text-white/90 leading-none -mt-0.5"
            style={{ fontSize: "clamp(36px, 12vw, 64px)" }}
          >
            BRIDE
          </p>
        </div>

        {/* Info — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-10">
          <AnimatedSection direction="up">
            <h2 className="font-display italic text-2xl sm:text-3xl text-white mb-1">
              {bride.fullName}
            </h2>
            <p className="font-body text-xs text-white/60 mb-0.5">Putri dari</p>
            <p className="font-body text-sm text-white/80">{bride.parents.father}</p>
            <p className="font-body text-sm text-white/80">&amp; {bride.parents.mother}</p>
            <a
              href={`https://instagram.com/${bride.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 border border-white/40 text-white/80 text-xs font-body tracking-wider px-4 py-1.5 hover:bg-white/10 transition-colors"
            >
              <Instagram size={12} />
              {bride.instagram}
            </a>
          </AnimatedSection>

          {/* Slide dots */}
          <div className="flex gap-1.5 mt-4">
            {BRIDE_PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-0.5 transition-all duration-300 ${
                  i === current ? "w-6 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
