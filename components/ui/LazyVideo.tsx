"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface Props {
  src: string;
  poster: string;
}

export default function LazyVideo({ src, poster }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-video bg-black/5">
      {shouldLoad ? (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => setPlaying(true)}
        />
      ) : (
        /* Tampilkan poster saja sampai video perlu di-load */
        <div className="relative w-full h-full">
          <Image
            src={poster}
            alt="Video thumbnail"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            quality={80}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
              <Play size={24} className="text-white ml-1" fill="white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
