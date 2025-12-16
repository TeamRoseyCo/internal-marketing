// src/components/video/hero-video-player.tsx
// BunnyStream video player component for hero section VSL
// Handles autoplay, responsive embed, and loading states
// RELEVANT FILES: src/app/page.tsx (hero section)

"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroVideoPlayerProps {
  videoId?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  autoplay?: boolean;
  className?: string;
}

export function HeroVideoPlayer({
  videoId = process.env.NEXT_PUBLIC_BUNNY_VIDEO_ID_HERO,
  embedUrl = process.env.NEXT_PUBLIC_BUNNY_VIDEO_EMBED_URL,
  thumbnailUrl = process.env.NEXT_PUBLIC_BUNNY_VIDEO_THUMBNAIL_URL,
  autoplay = true,
  className = "",
}: HeroVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Construct embed URL with params if not provided
  const finalEmbedUrl = embedUrl ||
    `https://player.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${videoId}`;

  const embedUrlWithParams = `${finalEmbedUrl}?autoplay=${autoplay}&loop=false&muted=false&preload=true&responsive=true`;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`aspect-video rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/30 flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <p className="text-lg text-muted-foreground">
            Unable to load video. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Loading state with thumbnail */}
      {isLoading && thumbnailUrl && (
        <div className="absolute inset-0 z-10">
          <Image
            src={thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover rounded-3xl"
            priority
          />
          {/* Loading overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center rounded-3xl">
            <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          </div>
        </div>
      )}

      {/* BunnyStream Video Embed */}
      <div
        className="relative aspect-video rounded-3xl overflow-hidden shadow-glow bg-card/50 backdrop-blur-sm border border-border/30"
        style={{ paddingTop: "56.25%", position: "relative" }}
      >
        <iframe
          src={embedUrlWithParams}
          loading="lazy"
          style={{
            border: 0,
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
          }}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Hero Video"
        />
      </div>
    </div>
  );
}
