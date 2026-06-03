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
    <div className="flex flex-col items-center gap-1.5">
      <span
        suppressHydrationWarning
        className="font-display text-3xl sm:text-4xl text-white tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </span>
      <p className="font-body text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-white/60">
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(weddingData.weddingDate));
    const id = setInterval(() => setTimeLeft(calcTimeLeft(weddingData.weddingDate)), 1000);
    return () => clearInterval(id);
  }, []);

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Pernikahan Tika & Krisna"
  )}&dates=20260619T000000Z/20260620T000000Z&location=${encodeURIComponent(
    weddingData.events[1].address
  )}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Uses global video background — just add overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-sm mx-auto px-6 text-center">
        <AnimatedSection>
          <div className="mb-8">
            <p className="font-script text-4xl sm:text-5xl text-white leading-tight">Countdown</p>
            <p className="font-display italic text-2xl sm:text-3xl text-white/80 -mt-1">Timer</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div
            className={`border border-white/50 px-6 py-8 transition-opacity duration-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex justify-center items-center gap-4 sm:gap-6">
              <TimeBox value={timeLeft.days} label="Days" />
              <span className="font-display text-2xl text-white/40 self-start mt-1">:</span>
              <TimeBox value={timeLeft.hours} label="Hours" />
              <span className="font-display text-2xl text-white/40 self-start mt-1">:</span>
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <span className="font-display text-2xl text-white/40 self-start mt-1">:</span>
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-7">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <CalendarPlus size={13} />
            Save The Date
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
