"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
}

export default function LoadingScreen({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#0f0d0c] flex flex-col items-center justify-center"
        >
          {/* Blinking couple names */}
          <motion.div
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <h1 className="font-script text-[56px] sm:text-[72px] text-white leading-none">
              Tika
            </h1>

            <div className="flex items-center justify-center gap-3 my-2">
              <div className="w-8 h-px bg-white/30" />
              <span className="font-display italic text-xl text-white/50">&</span>
              <div className="w-8 h-px bg-white/30" />
            </div>

            <h1 className="font-script text-[56px] sm:text-[72px] text-white leading-none">
              Krisna
            </h1>
          </motion.div>

          {/* Loading dots */}
          <div className="flex gap-1.5 mt-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-white/50"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
