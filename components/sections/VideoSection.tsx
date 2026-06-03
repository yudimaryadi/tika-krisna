"use client";

import { Radio } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function VideoSection() {
  return (
    <>
      {/* Live Streaming Section — uses global video bg */}
      <section className="relative min-h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />

        <AnimatedSection className="relative z-10 text-center px-8">
          <div className="border border-white/40 px-10 py-10 max-w-xs mx-auto">
            <Radio size={20} className="text-white/60 mx-auto mb-5" />
            <p className="font-body text-[9px] tracking-[0.45em] uppercase text-white/60 mb-3">
              Join Our Exclusive
            </p>
            <p className="font-display italic text-2xl sm:text-3xl text-white mb-1">
              Live Streaming
            </p>
            <p className="font-body text-[9px] tracking-[0.35em] uppercase text-white/60 mb-1">
              Event
            </p>
            <div className="w-8 h-px bg-white/30 mx-auto my-4" />
            <p className="font-body text-xs tracking-[0.2em] uppercase text-white/70 mb-6">
              Jumat, 19 Juni 2026
            </p>
            <a
              href={weddingData.liveStream ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Join Live
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* YouTube Video Section */}
      <section className="relative py-10 px-4">
        <div className="absolute inset-0 bg-black/50" />
        <AnimatedSection className="relative z-10 max-w-lg mx-auto">
          <div className="relative border border-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/30 z-10" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/30 z-10" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/30 z-10" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/30 z-10" />
            <div className="aspect-video">
              <iframe
                src={`${weddingData.video}?rel=0&modestbranding=1`}
                title="Video Tika & Krisna"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
