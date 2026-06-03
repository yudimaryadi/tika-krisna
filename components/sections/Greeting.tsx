"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Greeting() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center py-24">
      {/* Uses global video background from page.tsx */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 max-w-md mx-auto px-8 text-center">
        <AnimatedSection>
          <p className="font-display italic text-xl sm:text-2xl text-white mb-5">
            Assalamualaikum Wr. Wb.
          </p>
          <div className="w-10 h-px bg-white/30 mx-auto mb-6" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="font-body text-sm text-white/80 leading-relaxed">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala,
            Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri
            Resepsi Pernikahan kami.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
