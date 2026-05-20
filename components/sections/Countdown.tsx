"use client";

import { useState, useEffect } from "react";
import { CalendarPlus } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

function calcTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[68px] h-[68px] sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/80 backdrop-blur border border-gold-200 shadow-sm flex items-center justify-center">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold-400" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold-400" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold-400" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold-400" />
        <span
          suppressHydrationWarning
          className="font-display text-3xl sm:text-4xl md:text-5xl text-primary-600 font-medium tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <p className="font-body text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gold-600 mt-1.5 sm:mt-2">
        {label}
      </p>
    </div>
  );
}

function Separator() {
  return (
    <div className="font-display text-2xl sm:text-3xl text-gold-400 self-start mt-5 sm:mt-6 pb-6">
      :
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(weddingData.weddingDate));
    const id = setInterval(
      () => setTimeLeft(calcTimeLeft(weddingData.weddingDate)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Pernikahan Tika & Krisna"
  )}&dates=20260619T000000Z/20260620T000000Z&location=${encodeURIComponent(
    weddingData.events[1].address
  )}`;

  return (
    <section className="py-16 sm:py-20 bg-cream/80 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A454 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-8 text-center">
        <AnimatedSection>
          <span className="section-tag">Menuju Hari Bahagia</span>
          <h2 className="section-title">Save The Date</h2>
          <div className="divider" />
          <p className="font-display text-sm sm:text-base text-gray-500 mt-3 sm:mt-4 tracking-wide">
            Jumat, 19 Juni 2026 · Jereweh, Sumbawa Barat
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-10 sm:mt-12">
          <div
            className={`flex justify-center gap-2 sm:gap-4 md:gap-6 transition-opacity duration-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <TimeBox value={timeLeft.days} label="Hari" />
            <Separator />
            <TimeBox value={timeLeft.hours} label="Jam" />
            <Separator />
            <TimeBox value={timeLeft.minutes} label="Menit" />
            <Separator />
            <TimeBox value={timeLeft.seconds} label="Detik" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-8 sm:mt-10">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <CalendarPlus size={14} />
            Simpan ke Kalender
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
