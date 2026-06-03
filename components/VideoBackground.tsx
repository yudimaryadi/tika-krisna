"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onReady: () => void;
}

const YT_VIDEO_ID = "u9dOdXOdmak";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        config: {
          videoId: string;
          playerVars: Record<string, number | string>;
          events: {
            onReady?: () => void;
            onError?: () => void;
          };
        }
      ) => { destroy: () => void };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function VideoBackground({ onReady }: Props) {
  const [useFallback, setUseFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<{ destroy: () => void } | null>(null);
  const readyRef = useRef(false);

  const triggerReady = () => {
    if (readyRef.current) return;
    readyRef.current = true;
    onReady();
  };

  useEffect(() => {
    // iOS Safari: YouTube IFrame tidak bisa autoplay → local video
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      setUseFallback(true);
      return;
    }

    // Fallback timer: jika YouTube tidak siap dalam 8 detik
    const fallbackTimer = setTimeout(() => {
      setUseFallback(true);
      triggerReady();
    }, 8000);

    const initPlayer = () => {
      if (!containerRef.current) return;
      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: YT_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: YT_VIDEO_ID,
            controls: 0,
            showinfo: 0,
            rel: 0,
            playsinline: 1,
            disablekb: 1,
            modestbranding: 1,
            iv_load_policy: 3,
            fs: 0,
          },
          events: {
            onReady: () => {
              clearTimeout(fallbackTimer);
              triggerReady();
            },
            onError: () => {
              clearTimeout(fallbackTimer);
              setUseFallback(true);
              triggerReady();
            },
          },
        });
      } catch {
        clearTimeout(fallbackTimer);
        setUseFallback(true);
        triggerReady();
      }
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
      if (!document.querySelector('script[src*="iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      clearTimeout(fallbackTimer);
      playerRef.current?.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (useFallback) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={triggerReady}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/krisna-tika.mp4" type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="yt-bg-wrap absolute inset-0 overflow-hidden">
      <div ref={containerRef} />
    </div>
  );
}
