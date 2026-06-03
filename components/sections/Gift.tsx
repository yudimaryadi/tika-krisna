"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1 text-white/60 hover:text-white transition-colors"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export default function Gift() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="relative min-h-[65vh] flex items-center justify-center">
      {/* Uses global video background */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-8 w-full max-w-sm mx-auto">
        <AnimatedSection>
          <p className="font-script text-5xl sm:text-6xl text-white leading-tight mb-1">
            Wedding
          </p>
          <p className="font-display italic text-2xl sm:text-3xl text-white/80">Gift</p>
          <div className="w-8 h-px bg-white/30 mx-auto my-5" />
          <p className="font-body text-xs text-white/60 tracking-wide mb-8">
            the most beautiful gift you can give us
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-outline mx-auto"
          >
            {showDetails ? "Tutup" : "Send gift"}
          </button>
        </AnimatedSection>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-3 text-left"
            >
              {weddingData.gifts.map((gift, i) => {
                const number = "accountNumber" in gift ? gift.accountNumber : gift.number;
                const label = gift.type === "bank"
                  ? `Bank ${"bank" in gift ? gift.bank : ""}`
                  : "name" in gift ? gift.name : "";
                return (
                  <div key={i} className="bg-white/10 border border-white/20 px-5 py-4 backdrop-blur-sm">
                    <p className="font-body text-[9px] tracking-[0.35em] uppercase text-white/50 mb-1">{label}</p>
                    <div className="flex items-center gap-1">
                      <p className="font-display text-lg text-white flex-1">{number}</p>
                      {number && <CopyBtn text={number} />}
                    </div>
                    <p className="font-body text-xs text-white/50 mt-1">a.n. {gift.accountName}</p>
                  </div>
                );
              })}

              <div className="bg-white/10 border border-white/20 px-5 py-4 backdrop-blur-sm">
                <p className="font-body text-[9px] tracking-[0.35em] uppercase text-white/50 mb-2">
                  Kirim ke Alamat
                </p>
                <p className="font-body text-sm text-white font-medium">{weddingData.address.label}</p>
                <p className="font-body text-xs text-white/60 mt-1 leading-relaxed">{weddingData.address.detail}</p>
                <p className="font-body text-xs text-white/70 mt-2">{weddingData.address.contact}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
