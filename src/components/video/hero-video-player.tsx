// src/components/video/hero-video-player.tsx
// BunnyStream video player component for hero section VSL
// Click-to-play with animated preview thumbnail (no autoplay)
// Uses HTML5 video with HLS for single-click playback control
// RELEVANT FILES: src/app/page.tsx (hero section)

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroVideoPlayerProps {
  videoId?: string;
  hlsUrl?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  className?: string;
}

export function HeroVideoPlayer({
  hlsUrl = process.env.NEXT_PUBLIC_BUNNY_VIDEO_HLS_URL,
  thumbnailUrl = process.env.NEXT_PUBLIC_BUNNY_VIDEO_THUMBNAIL_URL,
  previewUrl = process.env.NEXT_PUBLIC_BUNNY_VIDEO_PREVIEW_URL,
  className = "",
}: HeroVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // Auto-play video when it becomes visible
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      // Small delay to ensure video element is ready
      setTimeout(() => {
        videoRef.current?.play().catch((error) => {
          console.log("Autoplay prevented:", error);
          // Fallback: video will show native play button if autoplay fails
        });
      }, 100);
    }
  }, [isPlaying]);

  return (
    <motion.div
      className={`relative w-full ${className}`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-glow bg-black border border-border/30">

        {/* Preview state - Animated thumbnail with play button */}
        {!isPlaying && (
          <>
            {/* Animated preview background (looping WebP) */}
            {previewUrl && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={previewUrl}
                  alt="Video preview"
                  fill
                  className="object-cover"
                  priority
                  unoptimized // WebP animation needs unoptimized
                />
              </div>
            )}

            {/* Fallback static thumbnail if preview doesn't load */}
            {!previewUrl && thumbnailUrl && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
              <motion.button
                onClick={handlePlayClick}
                className="group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Outer glow ring with gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-brand-green/30 to-brand-forest/20 blur-2xl group-hover:from-primary/40 group-hover:via-brand-green/40 group-hover:to-brand-forest/30 transition-all duration-300" />

                {/* Play button with gradient background */}
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-brand-green to-primary/90 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 group-hover:shadow-[0_0_60px_rgba(220,60,70,0.6)] transition-all duration-300 shadow-2xl">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Play triangle */}
                    <div className="w-0 h-0 border-l-[20px] md:border-l-[28px] border-l-white border-t-[12px] md:border-t-[16px] border-t-transparent border-b-[12px] md:border-b-[16px] border-b-transparent ml-1.5 md:ml-2" />
                  </motion.div>
                </div>

                {/* Text below button */}
                <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm md:text-base text-white/90 font-medium whitespace-nowrap">
                  Watch how we help businesses grow
                </p>
              </motion.button>
            </div>
          </>
        )}

        {/* HTML5 Video player - loads when clicked */}
        {isPlaying && hlsUrl && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            controls
            playsInline
            preload="auto"
            poster={thumbnailUrl}
          >
            <source src={hlsUrl} type="application/x-mpegURL" />
            <source src={hlsUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </motion.div>
  );
}
