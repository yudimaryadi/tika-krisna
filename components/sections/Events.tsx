"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function Events() {
  const akad = weddingData.events[0];
  const resepsi = weddingData.events[1];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-8 pb-16">
      {/* Global video bg overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Arch photo frame */}
      <AnimatedSection className="relative z-10 mt-2">
        {/* Outer glow border */}
        <div
          className="relative mx-auto"
          style={{
            width: "clamp(190px, 54vw, 250px)",
            height: "clamp(290px, 82vw, 380px)",
          }}
        >
          {/* Outer border ring */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "9999px 9999px 0 0",
              border: "1px solid rgba(255,255,255,0.25)",
              inset: "-6px -6px 0 -6px",
            }}
          />

          {/* Main arch — border tegas */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: "9999px 9999px 0 0",
              border: "1.5px solid rgba(255,255,255,0.85)",
            }}
          >
            <Image
              src="/foto/IMG_3522.jpg"
              alt="Wedding couple"
              fill
              className="object-cover object-top"
              sizes="250px"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </AnimatedSection>

      {/* Section title */}
      <AnimatedSection delay={0.15} className="relative z-10 text-center mt-5">
        <p className="font-script text-4xl sm:text-5xl text-white leading-tight">Wedding</p>
        <p className="font-display italic text-2xl sm:text-3xl text-white/80 -mt-1">Event</p>
      </AnimatedSection>

      {/* Divider */}
      <div className="relative z-10 w-16 h-px bg-white/30 my-5" />

      {/* Date display */}
      <AnimatedSection delay={0.25} className="relative z-10 text-center w-full max-w-xs px-6">
        {/* Date row dengan garis */}
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="flex-1 h-px bg-white/50" />
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-white/70">JUMAT</p>
          <p className="font-display text-5xl sm:text-6xl font-light text-white leading-none">
            19
          </p>
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-white/70">JUNI</p>
          <div className="flex-1 h-px bg-white/50" />
        </div>
        <p className="font-body text-[10px] tracking-[0.4em] text-white/50 mb-6">2026</p>

        {/* AKAD | RESEPSI */}
        <div className="flex items-start justify-center mb-6">
          <div className="flex-1 text-center pr-4">
            <p className="font-display text-xl sm:text-2xl text-white font-semibold tracking-widest">
              AKAD
            </p>
            <p className="font-body text-xs text-white/70 mt-1.5">{akad.time}</p>
          </div>
          {/* Garis vertikal pemisah */}
          <div className="w-px self-stretch bg-white/50 mx-1" />
          <div className="flex-1 text-center pl-4">
            <p className="font-display text-xl sm:text-2xl text-white font-semibold tracking-widest">
              RESEPSI
            </p>
            <p className="font-body text-xs text-white/70 mt-1.5">{resepsi.time}</p>
          </div>
        </div>

        {/* Garis bawah AKAD/RESEPSI */}
        <div className="w-full h-px bg-white/25 mb-6" />

        {/* Venue */}
        <p className="font-display italic text-xl sm:text-2xl text-white mb-1.5">
          {resepsi.venue}
        </p>
        <p className="font-body text-xs text-white/60 leading-relaxed mb-7">
          {resepsi.address}
        </p>

        <a
          href={resepsi.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <MapPin size={12} />
          Google Maps
        </a>
      </AnimatedSection>
    </section>
  );
}
