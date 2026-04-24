"use client";

import { useState } from "react";

interface VSLPlaceholderProps {
  /** Direct mp4 URL. If provided, renders an autoplay muted loop. */
  src?: string;
  poster?: string;
  embedUrl?: string;
  title?: string;
  className?: string;
  aspect?: "video" | "portrait";
}

const DEFAULT_SRC = "/hero-welcome.mp4";

export function VSLPlaceholder({
  src = DEFAULT_SRC,
  poster,
  embedUrl,
  title = "Rosey Co. Overview",
  className = "",
  aspect = "video",
}: VSLPlaceholderProps) {
  const [playing, setPlaying] = useState(false);
  const aspectClass = aspect === "portrait" ? "aspect-[9/16]" : "aspect-video";

  if (src) {
    return (
      <div
        className={`relative w-full ${aspectClass} rounded-[18px] overflow-hidden bg-[#1d1d1f] shadow-2xl ${className}`}
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          controls
          controlsList="nodownload"
          playsInline
          preload="metadata"
          aria-label={title}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} rounded-[18px] overflow-hidden bg-[#1d1d1f] shadow-2xl ${className}`}
    >
      {playing && embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => embedUrl && setPlaying(true)}
          aria-label={embedUrl ? `Play ${title}` : `${title} video coming soon`}
          className="absolute inset-0 w-full h-full flex items-center justify-center group"
          style={
            poster
              ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }
              : undefined
          }
        >
          {!poster && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1f] to-[#000]" aria-hidden="true" />
          )}
          <span className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white/95 text-black shadow-xl transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-5 left-6 right-6 z-10 text-left text-white/85 text-[14px]">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
