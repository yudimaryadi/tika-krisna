"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

interface Props {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop src="/music/background.mp3" preload="auto" />

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        onClick={toggle}
        title={isPlaying ? "Matikan musik" : "Putar musik"}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary-500/90 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors"
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Music2 size={17} />
          </motion.div>
        ) : (
          <VolumeX size={17} />
        )}
      </motion.button>
    </>
  );
}
