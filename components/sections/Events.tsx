"use client";

import { MapPin, Clock, Calendar } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

export default function Events() {
  return (
    <section className="py-20 bg-petal/80">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="section-tag">Rangkaian Acara</span>
          <h2 className="section-title">Jadwal Pernikahan</h2>
          <div className="divider" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {weddingData.events.map((event, i) => (
            <AnimatedSection key={event.id} delay={i * 0.15}>
              <div className="relative card-border p-8 overflow-hidden">
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-14 h-14">
                  <div className="absolute top-0 right-0 h-14 w-px bg-gold-300/60" />
                  <div className="absolute top-0 right-0 w-14 h-px bg-gold-300/60" />
                </div>
                <div className="absolute bottom-0 left-0 w-14 h-14">
                  <div className="absolute bottom-0 left-0 h-14 w-px bg-gold-300/60" />
                  <div className="absolute bottom-0 left-0 w-14 h-px bg-gold-300/60" />
                </div>

                <span className="font-body text-[9px] tracking-[0.4em] uppercase text-gold-500 mb-2 block">
                  {event.label}
                </span>
                <h3 className="font-display text-3xl text-primary-700 mb-6">
                  {event.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <p className="font-body text-sm text-gray-700">{event.date}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <p className="font-body text-sm text-gray-700">{event.time}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-body text-sm font-medium text-gray-800">
                        {event.venue}
                      </p>
                      <p className="font-body text-xs text-gray-500 mt-0.5">
                        {event.address}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-7 text-[10px]"
                >
                  <MapPin size={11} />
                  Buka Peta
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
