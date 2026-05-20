"use client";

import { useState } from "react";
import Image from "next/image";
import Opening from "@/components/Opening";
import GuestProvider from "@/components/GuestProvider";
import Hero from "@/components/sections/Hero";
import Greeting from "@/components/sections/Greeting";
import Couple from "@/components/sections/Couple";
import Countdown from "@/components/sections/Countdown";
import Events from "@/components/sections/Events";
import LoveStory from "@/components/sections/LoveStory";
import Gallery from "@/components/sections/Gallery";
import VideoSection from "@/components/sections/VideoSection";
import RSVP from "@/components/sections/RSVP";
import Gift from "@/components/sections/Gift";
import Footer from "@/components/sections/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import weddingData from "@/data/wedding.json";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  return (
    <GuestProvider>
      <Opening
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onMusicStart={() => setPlayMusic(true)}
      />

      {/* Fixed photo background — muncul setelah undangan dibuka */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={weddingData.openingPhoto}
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <main
        className={`relative z-10 transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <MusicPlayer autoPlay={playMusic} />
        <Hero />
        <Greeting />
        <Couple />
        <Countdown />
        <Events />
        <LoveStory />
        <Gallery />
        <VideoSection />
        <RSVP />
        <Gift />
        <Footer />
      </main>
    </GuestProvider>
  );
}
