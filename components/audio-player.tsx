"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Royalty-free elegant romantic piano wedding background track
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback blocked or failed:", err);
      });
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 border border-sepia-border backdrop-blur-md shadow-md hover:bg-white active:scale-95 transition-all duration-300 group"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {/* Pulsing indicator when playing */}
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-blue opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? "bg-royal-blue" : "bg-slate-blue/40"}`}></span>
        </span>

        {/* Lucide Icons */}
        {isPlaying ? (
          <Pause className="w-4 h-4 text-navy-primary fill-current transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <Play className="w-4 h-4 text-navy-primary fill-current transition-transform duration-300 group-hover:scale-105" />
        )}

        <Music className={`w-3.5 h-3.5 text-navy-primary/70 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
      </button>
    </div>
  );
}
