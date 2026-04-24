"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ApplePlayerProps {
  src: string;
  poster?: string;
  title?: string;
  aspect?: "video" | "portrait";
  className?: string;
}

/** Minimal, premium video player. Autoplay muted loop by default. Hover
 *  reveals a thin bottom control bar with play/pause, scrubber, time, mute
 *  and fullscreen. No native browser controls anywhere. */
export function ApplePlayer({
  src,
  poster,
  title = "Video",
  aspect = "video",
  className = "",
}: ApplePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  // Sync play/pause state from the <video> element.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      setCurrent(v.currentTime);
      setProgress(v.duration ? v.currentTime / v.duration : 0);
    };
    const onLoadedMeta = () => setDuration(v.duration || 0);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("loadedmetadata", onLoadedMeta);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("loadedmetadata", onLoadedMeta);
    };
  }, []);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const seekTo = useCallback((ratio: number) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = Math.max(0, Math.min(v.duration, ratio * v.duration));
  }, []);

  const onScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(ratio);
  };

  const fullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen().catch(() => {});
  }, []);

  const showControls = () => {
    setHovering(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setHovering(false), 2400);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  const aspectClass = aspect === "portrait" ? "aspect-[9/16]" : "aspect-video";
  const controlsVisible = hovering || !playing;

  return (
    <div
      ref={rootRef}
      className={`ac-player relative w-full ${aspectClass} rounded-[18px] overflow-hidden bg-black shadow-2xl ${className}`}
      onPointerMove={showControls}
      onPointerEnter={showControls}
      onPointerLeave={() => setHovering(false)}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Center play button — only when paused */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); toggle(); }}
        aria-label={playing ? "Pause" : "Play"}
        className="ac-player-center"
        data-hidden={playing ? "1" : "0"}
      >
        <span className="ac-player-center-inner">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>

      {/* Bottom control bar */}
      <div
        className="ac-player-bar"
        data-visible={controlsVisible ? "1" : "0"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          aria-label={playing ? "Pause" : "Play"}
          className="ac-player-btn"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <div
          className="ac-player-scrub"
          onClick={onScrubClick}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <div className="ac-player-scrub-fill" style={{ width: `${progress * 100}%` }} />
          <div className="ac-player-scrub-thumb" style={{ left: `${progress * 100}%` }} />
        </div>
        <div className="ac-player-time">
          {fmt(current)} / {fmt(duration)}
        </div>
        <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="ac-player-btn">
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z" /><path d="M16.5 12l3.5-3.5-1.4-1.4L15.1 10.6 11.7 7.2 10.3 8.6 13.7 12l-3.4 3.4 1.4 1.4 3.4-3.4 3.5 3.5 1.4-1.4z" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z" /><path d="M14 8.5v7a4 4 0 000-7z" /><path d="M16 5v14a8 8 0 000-14z" opacity="0.6" /></svg>
          )}
        </button>
        <button type="button" onClick={fullscreen} aria-label="Fullscreen" className="ac-player-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9V4h5" /><path d="M20 9V4h-5" /><path d="M4 15v5h5" /><path d="M20 15v5h-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
