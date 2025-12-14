"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Mail } from "lucide-react";
import GradientButton from "../GradientButton";

/**
 * FloatingHearts component
 * - lightweight floating hearts animation
 * - automatically appends/removes hearts to document.body
 */
function FloatingHearts({
  emoji = "💗",
  intervalMs = 1200,
  lifeMs = 5200,
  maxSize = 26,
  minSize = 18,
}) {
  useEffect(() => {
    let alive = true;
    const spawn = () => {
      if (!alive) return;
      const heart = document.createElement("div");
      heart.innerText = emoji;
      heart.style.position = "fixed";
      // start at random x but keep margins so they don't spawn off-screen
      const x = Math.random() * (window.innerWidth - 40) + 20;
      heart.style.left = `${x}px`;
      heart.style.bottom = "-24px";
      const size = Math.round(Math.random() * (maxSize - minSize) + minSize);
      heart.style.fontSize = `${size}px`;
      heart.style.opacity = `${0.8 - Math.random() * 0.3}`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "60";
      heart.style.filter = "drop-shadow(0 6px 14px rgba(255,50,150,0.12))";
      heart.style.transform = `translateY(0) scale(${0.9 + Math.random() * 0.3})`;
      heart.style.transition = `transform ${lifeMs}ms linear, opacity ${lifeMs}ms linear`;

      // append and trigger transition on next frame
      document.body.appendChild(heart);
      // small delay to allow initial style to be applied then change to final
      requestAnimationFrame(() => {
        const endY = Math.round(180 + Math.random() * 140);
        const driftX = (Math.random() - 0.5) * 120; // slight horizontal drift
        heart.style.transform = `translate(${driftX}px, -${endY}px) scale(${1.1 + Math.random() * 0.6})`;
        heart.style.opacity = "0";
      });

      // remove after life
      setTimeout(() => {
        if (heart && heart.parentNode) heart.remove();
      }, lifeMs + 200);
    };

    const id = setInterval(spawn, intervalMs);
    // spawn a few immediately for nicer effect
    spawn();
    spawn();

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [emoji, intervalMs, lifeMs, maxSize, minSize]);

  // global keyframe isn't strictly required since we use transitions,
  // but include minimal global style to avoid flicker in some browsers
  return (
    <style jsx global>{`
      /* nothing heavy here — hearts use direct style + transitions */
    `}</style>
  );
}

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // IMPORTANT: using .jpg because your files in public/images are .jpg
  const photos = [
    { src: "/images/1.jpg", caption: "A face my eyes never get    bored of ❤️"  },
    { src: "/images/2.jpg", caption: "My Happy Home 🏡❤️" },
    { src: "/images/3.jpg", caption: "Life feels happier with you 💕" },
    { src: "/images/4.jpg", caption: "IYKYK 🌚" },
    { src: "/images/5.jpg", caption: "Us. Always. Forever. 💞" },
    { src: "/images/6.jpg", caption: "I’d choose this walk every lifetime" },
    { src: "/images/7.jpg", caption: "You & Me, always 💖" },
    { src: "/images/8.jpg", caption: "Comfort looks like this 🤍🫶" },
  ];

  return (
    <>
      {/* Floating hearts (soft, non-intrusive) */}
      <FloatingHearts emoji="💖" intervalMs={1100} lifeMs={5200} minSize={18} maxSize={26} />

      <div className="px-4 md:px-6 py-10">
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
          >
            Our Beautiful Moments ❤️
          </motion.h2>
          <p className="text-sm text-rose-100/90 mt-1">(Swipe the cards)</p>
        </div>

        <div className="relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Swiper
              effect="cards"
              grabCursor
              modules={[EffectCards]}
              onSwiper={(sw) => (swiperRef.current = sw)}
              onSlideChange={(sw) => setCurrent(sw.activeIndex)}
              className="w-[280px] h-[420px] md:w-[340px] md:h-[460px]"
            >
              {photos.map((p, i) => (
                <SwiperSlide key={i}>
                  {/* Polaroid-style card */}
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.6)] w-[92%] h-[92%] flex flex-col items-center pt-4 pb-4">
                      <div className="w-[88%] h-[74%] overflow-hidden rounded-lg">
                        <img
                          src={p.src}
                          alt={p.caption || `Memory ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Polaroid label — centered under the image */}
                      <p
                        className="mt-3 text-gray-700 text-center tracking-wide"
                        style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "1.05rem" }}
                      >
                        {p.caption}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Footer button + index */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <GradientButton onClick={onNext}>
            <Mail size={20} className="mt-0.5" /> Open My Message
          </GradientButton>

          <div className="text-sm text-rose-100/80">
            {current + 1} / {photos.length}
          </div>
        </motion.div>
      </div>
    </>
  );
}