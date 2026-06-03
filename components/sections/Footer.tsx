"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* "See you on our special day" — uses global video bg */}
      <div className="relative min-h-[55vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 text-center px-8">
          <AnimatedSection>
            <p className="font-display italic text-2xl sm:text-3xl text-white mb-8">
              See you on our special day
            </p>
          </AnimatedSection>

          {/* TK Monogram */}
          <AnimatedSection delay={0.2}>
            <div
              className="font-display italic text-white leading-none select-none mx-auto"
              style={{
                fontSize: "clamp(90px, 28vw, 160px)",
                letterSpacing: "-0.06em",
              }}
            >
              <span className="inline-block">K</span>
              <span className="inline-block -ml-[0.1em]">T</span>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Footer info */}
      <div className="relative bg-black/60 py-10 text-center px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-6 mb-5">
            <a
              href="https://yudimaryadi.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Made by iduyy
            </a>
          </div>
          <p className="font-body text-[10px] text-white/30">
            ©2026 All rights reserved.
          </p>
        </AnimatedSection>
      </div>
    </footer>
  );
}
