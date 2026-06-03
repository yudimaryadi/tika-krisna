"use client";

import { useState } from "react";
import Opening from "@/components/Opening";
import GuestProvider from "@/components/GuestProvider";
import LoadingScreen from "@/components/LoadingScreen";
import VideoBackground from "@/components/VideoBackground";
import Hero from "@/components/sections/Hero";
import Monogram from "@/components/sections/Monogram";
import Greeting from "@/components/sections/Greeting";
import BrideSection from "@/components/sections/BrideSection";
import GroomSection from "@/components/sections/GroomSection";
import Countdown from "@/components/sections/Countdown";
import Events from "@/components/sections/Events";
import VideoSection from "@/components/sections/VideoSection";
import LoveStory from "@/components/sections/LoveStory";
import Gallery from "@/components/sections/Gallery";
import RSVP from "@/components/sections/RSVP";
import Gift from "@/components/sections/Gift";
import Footer from "@/components/sections/Footer";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [videoReady, setVideoReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  return (
    <GuestProvider>
      {/* Loading screen — tampil sampai video siap */}
      <LoadingScreen show={!videoReady} />

      {/* Fixed video background — YouTube (desktop) atau local (iOS Safari) */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <VideoBackground onReady={() => setVideoReady(true)} />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Opening — hanya tampil setelah video siap */}
      {videoReady && (
        <Opening
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onMusicStart={() => setPlayMusic(true)}
        />
      )}

      <main
        className={`relative z-10 transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <MusicPlayer autoPlay={playMusic} />
        <Hero />
        <Monogram />
        <Greeting />
        <BrideSection />
        <GroomSection />
        <Countdown />
        <Events />
        <VideoSection />
        <LoveStory />
        <Gallery />
        <RSVP />
        <Gift />
        <Footer />
      </main>
    </GuestProvider>
  );
}
