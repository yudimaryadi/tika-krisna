"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import weddingData from "@/data/wedding.json";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={weddingData.gallery[11]}
          alt="Hero"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-cream" />
      </div>

      <div className="relative z-10 text-center pb-16 sm:pb-20 px-6 max-w-2xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-[9px] sm:text-[10px] tracking-[0.45em] uppercase text-gold-400 mb-4 sm:mb-5"
        >
          The Wedding of
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="font-script text-[64px] sm:text-8xl md:text-[110px] leading-none text-white drop-shadow-lg">
            {weddingData.couple.bride.nickname}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3"
        >
          <div className="h-px w-10 sm:w-12 bg-gold-400/60" />
          <span className="font-display text-xl sm:text-2xl text-gold-300">&</span>
          <div className="h-px w-10 sm:w-12 bg-gold-400/60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <h1 className="font-script text-[64px] sm:text-8xl md:text-[110px] leading-none text-white drop-shadow-lg">
            {weddingData.couple.groom.nickname}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-5 sm:mt-6 space-y-1"
        >
          <p className="font-display text-base sm:text-lg tracking-[0.15em] uppercase text-black/90">
            Jumat, 19 Juni 2026
          </p>
          <p className="font-body text-xs sm:text-sm text-black/60 tracking-wider">
            Jereweh, Sumbawa Barat
          </p>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/40 rounded-full flex justify-center pt-1.5 mx-auto"
        >
          <div className="w-0.5 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
