"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface Props {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const triedRef = useRef(false);

  useEffect(() => {
    if (!autoPlay || triedRef.current) return;
    triedRef.current = true;

    // Coba langsung, kalau gagal (browser block) tunggu interaksi
    const tryPlay = () => {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback: coba lagi saat user scroll/touch
          const retry = () => {
            audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener("touchstart", retry);
            window.removeEventListener("scroll", retry);
          };
          window.addEventListener("touchstart", retry, { once: true });
          window.addEventListener("scroll", retry, { once: true });
        });
    };

    // Delay kecil agar transition opening selesai dulu
    const t = setTimeout(tryPlay, 300);
    return () => clearTimeout(t);
  }, [autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/music/background.mp3" preload="auto" />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 180 }}
        onClick={toggle}
        title={isPlaying ? "Matikan musik" : "Putar musik"}
        className="fixed right-4 bottom-6 z-40 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} fill="white" />}
      </motion.button>
    </>
  );
}
