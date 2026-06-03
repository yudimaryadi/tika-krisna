"use client";

import { motion } from "framer-motion";
import weddingData from "@/data/wedding.json";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Global video background dari page.tsx — tidak perlu foto lokal */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

      {/* Couple names — bottom left */}
      <div className="relative z-10 px-8 pb-16 sm:pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            className="font-display italic font-semibold text-white leading-[0.9]"
            style={{ fontSize: "clamp(72px, 20vw, 130px)" }}
          >
            {weddingData.couple.bride.nickname}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center gap-3 my-3 origin-left"
        >
          <div className="w-16 h-px bg-white/40" />
          <span className="font-script text-2xl text-white/80">&</span>
          <div className="w-8 h-px bg-white/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            className="font-display italic font-semibold text-white leading-[0.9]"
            style={{ fontSize: "clamp(72px, 20vw, 130px)" }}
          >
            {weddingData.couple.groom.nickname}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center gap-4 mt-6"
        >
          <div className="flex-1 h-px bg-white/20" />
          <p className="font-body text-[11px] tracking-[0.3em] text-white/60 whitespace-nowrap">
            19/06/26
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
