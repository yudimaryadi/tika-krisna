"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

const GROOM_PHOTOS = [
  "/foto/krisna.jpg",
  "/foto/IMG_3456.jpg",
  "/foto/IMG_3640.jpg",
];

export default function GroomSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % GROOM_PHOTOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { groom } = weddingData.couple;

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
              src={GROOM_PHOTOS[current]}
              alt="The Groom"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
          </motion.div>
        </AnimatePresence>

        {/* THE GROOM — kiri bawah, di atas info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-10">
          {/* THE GROOM label */}
          <div className="leading-none mb-4">
            <p
              className="font-display italic font-bold text-white/15 leading-none select-none"
              style={{ fontSize: "clamp(48px, 16vw, 80px)" }}
            >
              THE GROOM
            </p>
          </div>

          <AnimatedSection direction="up">
            <h2 className="font-display italic text-2xl sm:text-3xl text-white mb-1">
              {groom.fullName}
            </h2>
            <p className="font-body text-xs text-white/60 mb-0.5">Putra dari</p>
            <p className="font-body text-sm text-white/80">{groom.parents.father}</p>
            <p className="font-body text-sm text-white/80">&amp; {groom.parents.mother}</p>
            <a
              href={`https://instagram.com/${groom.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 border border-white/40 text-white/80 text-xs font-body tracking-wider px-4 py-1.5 hover:bg-white/10 transition-colors"
            >
              <Instagram size={12} />
              {groom.instagram}
            </a>
          </AnimatedSection>

          {/* Slide dots */}
          <div className="flex gap-1.5 mt-4">
            {GROOM_PHOTOS.map((_, i) => (
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
