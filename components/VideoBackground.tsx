"use client";

interface Props {
  onReady: () => void;
}
// ganti video

export default function VideoBackground({ onReady }: Props) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      onLoadedMetadata={onReady}
      onCanPlay={onReady}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/video/Krisna-Tika.mp4" type="video/mp4" />
    </video>
  );
}
