"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import GradientButton from "../GradientButton";
import { ArrowRight, Flame } from "lucide-react";

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

export default function CakeScreen({ onNext, onDecorate }) {
  const [lit, setLit] = useState(false);

  const lightCandle = () => {
    if (lit) return;
    setLit(true);

    // confetti bursts
    setTimeout(() => burst(), 400);
    setTimeout(() => burst(), 900);
    setTimeout(() => {
      // optional callback after celebration (if parent provided)
      onDecorate?.();
    }, 1400);
  };

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    });
  };

  return (
    <div className="px-4 md:px-6 py-10 text-center relative">
      {/* Heading: appears only after candle is lit */}
      <AnimatePresence>
        {lit && (
          <motion.h2
            key="lit-heading"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            className="mx-auto max-w-full text-center text-3xl md:text-5xl font-bold
                       text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400
                       drop-shadow leading-tight px-6 mb-6"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.35))" }}
          >
            Happy birthday, my love ❤️
          </motion.h2>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center gap-8 mt-12 md:mt-20">
        <div className="relative mb-2">
          <Cake lit={lit} />
        </div>

        <AnimatePresence mode="wait">
          {!lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, delay: 0.25 } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
            >
              <GradientButton onClick={lightCandle} aria-label="Light the candle">
                <Flame size={18} />
                Light the Candle
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, delay: 1.6 } }}
            >
              <GradientButton onClick={onNext} aria-label="Go to next">
                Next
                <ArrowRight size={18} className="mt-0.5" />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Cake markup remains the same but flame uses framer-motion.
   Keep your CSS for .cake, .plate, .layer, .icing, .drip, .flame as before. */
function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake" aria-hidden>
        <div className="plate" />
        <div className="layer layer-bottom" />
        <div className="layer layer-middle" />
        <div className="layer layer-top" />
        <div className="icing" />
        <div className="drip drip1" />
        <div className="drip drip2" />
        <div className="drip drip3" />
        <div className="candle">
          {lit && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="flame"
              aria-hidden
            />
          )}
        </div>
      </div>
    </div>
  );
}
