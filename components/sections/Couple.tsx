"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import weddingData from "@/data/wedding.json";

function PersonCard({
  person,
  role,
  direction,
}: {
  person: (typeof weddingData.couple.bride) | (typeof weddingData.couple.groom);
  role: string;
  direction: "left" | "right";
}) {
  return (
    <AnimatedSection direction={direction} className="text-center">
      <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto mb-5 sm:mb-6">
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-gold-300/60 scale-105" />
        <div className="absolute inset-0 rounded-full border border-gold-200/40 scale-110" />
        <Image
          src={person.photo}
          alt={person.fullName}
          fill
          className="object-cover rounded-full"
          sizes="208px"
        />
      </div>

      <span className="section-tag">{role}</span>
      <h3 className="font-script text-5xl text-primary-600 leading-tight mb-1">
        {person.nickname}
      </h3>
      <p className="font-display text-lg text-gray-700 mb-4">{person.fullName}</p>

      <div className="space-y-0.5">
        <p className="font-body text-xs text-gray-400 tracking-wider">Putri / Putra dari</p>
        <p className="font-body text-sm text-gray-700">{person.parents.father}</p>
        <p className="font-body text-sm text-gray-700">&amp; {person.parents.mother}</p>
      </div>

      <a
        href={`https://instagram.com/${person.instagram.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-4 font-body text-xs text-primary-500 hover:text-primary-700 transition-colors"
      >
        <Instagram size={13} />
        {person.instagram}
      </a>
    </AnimatedSection>
  );
}

export default function Couple() {
  return (
    <section className="py-16 sm:py-20 bg-petal/80 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-tag">Yang Berbahagia</span>
          <h2 className="section-title">Mempelai</h2>
          <div className="divider" />
        </AnimatedSection>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center">
          <PersonCard
            person={weddingData.couple.bride}
            role="Mempelai Wanita"
            direction="left"
          />

          {/* Center divider */}
          <AnimatedSection className="hidden md:flex flex-col items-center gap-4">
            <div className="h-32 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent" />
            <div className="w-8 h-8 rounded-full border border-gold-400 flex items-center justify-center">
              <span className="font-script text-xl text-gold-500">&</span>
            </div>
            <div className="h-32 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent" />
          </AnimatedSection>

          <PersonCard
            person={weddingData.couple.groom}
            role="Mempelai Pria"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}
