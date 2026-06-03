"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import weddingData from "@/data/wedding.json";
import { useGuest } from "@/lib/guest-context";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onMusicStart: () => void;
}

export default function Opening({ isOpen, onOpen, onMusicStart }: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const guest = useGuest();

  const handleOpen = () => {
    onMusicStart();
    setIsClosing(true);
    setTimeout(() => onOpen(), 800);
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background photo */}
          <div className="absolute inset-0">
            <Image
              src={weddingData.openingPhoto}
              alt="Opening"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>

          {/* Watermark name background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden gap-0">
            <span
              className="font-display italic leading-none text-white/[0.05] uppercase"
              style={{ fontSize: "clamp(80px, 28vw, 180px)", letterSpacing: "0.1em" }}
            >
              {weddingData.couple.bride.nickname}
            </span>
            <span
              className="font-display italic leading-none text-white/[0.05] uppercase"
              style={{ fontSize: "clamp(80px, 28vw, 180px)", letterSpacing: "0.1em" }}
            >
              {weddingData.couple.groom.nickname}
            </span>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center text-white px-6 max-w-xs sm:max-w-sm w-full">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-body text-[9px] tracking-[0.5em] uppercase text-white/60 mb-4"
            >
              The Wedding Of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display italic text-[44px] sm:text-[54px] leading-tight text-white"
            >
              {weddingData.couple.bride.nickname} &amp; {weddingData.couple.groom.nickname}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="font-body text-[10px] tracking-[0.28em] text-white/60 mt-3"
            >
              Jumat, 19 Juni 2026
            </motion.p>

            {guest && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="mt-6 mb-2 text-center"
              >
                <p className="font-body text-[9px] tracking-[0.4em] uppercase text-white/40 mb-1">
                  Dear,
                </p>
                <p className="font-display text-xl sm:text-2xl text-white font-medium">
                  {guest}
                </p>
                <div className="w-8 h-px bg-white/30 mx-auto mt-3" />
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: guest ? 1.5 : 1.2, duration: 0.5 }}
              onClick={handleOpen}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 flex items-center gap-2.5 font-body text-[10px] tracking-[0.3em] uppercase border border-white/50 text-white px-9 py-3.5 transition-all duration-300"
            >
              <Mail size={12} />
              Buka Undangan
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
