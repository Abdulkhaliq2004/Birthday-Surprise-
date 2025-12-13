"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startMusic = () => {
      audio.play().catch(() => {});
    };

    // Auto-play only AFTER first click (browser rule)
    window.addEventListener("click", startMusic, { once: true });

    return () => {
      window.removeEventListener("click", startMusic);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      {/* BACKGROUND MUSIC (hidden audio element) */}
      <audio ref={audioRef} src="/birthday.mp3" loop preload="auto" />

      {/* GLOWING PINK MUTE / UNMUTE BUTTON */}
      <motion.button
        onClick={toggleMute}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          fixed top-6 right-6 z-50
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-pink-500/30
          backdrop-blur-md
          border border-pink-400/40
          shadow-[0_0_15px_rgba(255,0,130,0.6)]
          hover:shadow-[0_0_25px_rgba(255,0,150,0.9)]
          transition-all duration-300
          active:scale-95
        "
      >
        {muted ? (
          <HiSpeakerXMark size={28} className="text-white drop-shadow-lg" />
        ) : (
          <HiSpeakerWave size={28} className="text-white drop-shadow-lg" />
        )}
      </motion.button>
    </>
  );
}
