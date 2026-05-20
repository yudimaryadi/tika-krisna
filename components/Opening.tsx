"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import weddingData from "@/data/wedding.json";
import { useGuest } from "@/lib/guest-context";

const GateCanvas = dynamic(() => import("@/components/GateCanvas"), { ssr: false });

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onMusicStart: () => void;
}

export default function Opening({ isOpen, onOpen, onMusicStart }: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const [gateActive, setGateActive] = useState(false);
  const [gateDone, setGateDone] = useState(false);
  const guest = useGuest();

  const handleOpen = () => {
    onMusicStart();
    setIsClosing(true);
    onOpen();
  };

  return (
    <>
      <AnimatePresence>
        {!isClosing && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background photo */}
            <div className="absolute inset-0">
              <Image
                src={weddingData.openingPhoto}
                alt="Opening background"
                fill
                className="object-cover scale-105"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
            </div>

            {/* Corner ornaments */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 border-t border-l border-gold-400/50" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 border-t border-r border-gold-400/50" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 border-b border-l border-gold-400/50" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 border-b border-r border-gold-400/50" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center text-white px-6 max-w-sm sm:max-w-md w-full">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-body text-[9px] sm:text-[10px] tracking-[0.45em] uppercase text-gold-300 mb-4 sm:mb-6"
              >
                Undangan Pernikahan
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <h1 className="font-script text-[52px] sm:text-[68px] leading-none drop-shadow-md">
                  {weddingData.couple.bride.nickname}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-3 my-2 sm:my-3"
              >
                <div className="w-8 sm:w-10 h-px bg-gold-400/60" />
                <span className="font-display text-gold-300 text-lg sm:text-xl">&</span>
                <div className="w-8 sm:w-10 h-px bg-gold-400/60" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                <h1 className="font-script text-[52px] sm:text-[68px] leading-none drop-shadow-md">
                  {weddingData.couple.groom.nickname}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="font-display text-xs sm:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/80 mt-4 sm:mt-5 mb-6 sm:mb-8"
              >
                19 Juni 2026 &nbsp;·&nbsp; Jereweh
              </motion.p>

              {guest && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="mb-4 sm:mb-5 text-center"
                >
                  <p className="font-body text-[9px] tracking-[0.35em] uppercase text-white/50 mb-1">
                    Kepada Yth.
                  </p>
                  <p className="font-display text-base sm:text-lg text-white/90 tracking-wide">
                    {guest}
                  </p>
                  <div className="w-10 h-px bg-gold-400/50 mx-auto mt-2.5" />
                </motion.div>
              )}

              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: guest ? 1.8 : 1.5, duration: 0.5 }}
                onClick={handleOpen}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="font-body text-[10px] sm:text-[11px] tracking-[0.3em] uppercase bg-transparent border border-gold-400/70 text-gold-300 px-8 sm:px-10 py-3.5 sm:py-4 hover:bg-white/10 transition-all duration-300"
              >
                Buka Undangan
              </motion.button>
            </div>

            {/* Floating petals */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0], y: [-20, -80], x: [0, (i % 2 === 0 ? 1 : -1) * 20] }}
                transition={{ delay: 2 + i * 0.4, duration: 3, repeat: Infinity, repeatDelay: i * 0.7 }}
                className="absolute text-gold-300/30 text-2xl select-none pointer-events-none"
                style={{ left: `${15 + i * 14}%`, bottom: "10%" }}
              >
                ✦
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {gateActive && !gateDone && (
        <GateCanvas
          active={gateActive}
          onComplete={() => {
            setGateDone(true);
            setIsClosing(true);
            onOpen();
          }}
        />
      )}
    </>
  );
}
