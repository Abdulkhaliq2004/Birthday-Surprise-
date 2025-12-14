"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import GradientButton from "../GradientButton";

export default function MessageScreen({ onNext }) {
  const [revealed, setRevealed] = useState(false);

  // choose the image you want to use as the tap-to-open card
  const cardSrc = "/images/13.jpg"; // change as needed

  const handleReveal = () => {
    // confetti burst for celebration
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.45 },
      scalar: 0.9,
    });

    // reveal message
    setRevealed(true);
  };

  // card animation states
  const cardVariants = {
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    hidden: { opacity: 0, scale: 0.98, y: 20, transition: { duration: 0.45, ease: "easeIn" } },
  };

  return (
    <div className="px-4 md:px-6 py-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6 leading-tight"
      >
        A Special Message
      </motion.h2>

      {/* TAP-TO-OPEN CARD */}
      {!revealed && (
        <div className="flex justify-center">
          <motion.div
            initial="visible"
            animate="visible"
            whileHover={{ scale: 1.01 }}
            variants={cardVariants}
            className="max-w-[560px] w-[92%] md:w-[560px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-white/95 overflow-hidden"
          >
            <div
              className="relative cursor-pointer"
              onClick={handleReveal}
              role="button"
              aria-label="Tap to open the message"
            >
              {/* Image */}
              <img
                src={cardSrc}
                alt="Tap to open card"
                className="w-full h-[420px] md:h-[480px] object-cover"
                loading="eager"
              />

              {/* CTA overlay inside card */}
              <div className="absolute left-0 right-0 bottom-6 flex justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); handleReveal(); }}
                  className="pointer-events-auto bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-6 md:px-10 py-2 rounded-full font-semibold shadow-[0_12px_30px_rgba(240,120,180,0.25)] hover:scale-[1.02] transition transform"
                >
                  Tap to Open
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* REVEALED MESSAGE */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto relative w-full max-w-3xl flex justify-center mt-6"
        >
          <div className="h-auto max-w-xl bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 rounded-2xl shadow-lg p-6 md:p-8 text-center">
            <p className="text-[#301733] text-base md:text-lg leading-relaxed overflow-y-auto max-h-[420px] pr-2">
              Happy Birthday love ❤️ 
              My BabyGirl 💕 My Sweetheart 💝 My Jaan and My EVERYTHING 🫶 
              Today is your birthday but i am not there mujhe bahut bura lg rha hai ki mai waha nahi hu I truly wanted to celebrate your birthday and watch your eyes light up with joy
              you know what mujhe kabhi kisi ke birthday ka intezaar nahi rehta jitna mai aapke birthday ka wait krta hu even apne birthday ka bhi nahi 
              Yaar mujhe ye letter likhna bilkul nahi aata type hi nahi kr paa rha hu samajh hi nahi aa rha kya likhu aur writting bhi itni hi khrab hai 😭😂
              you are my home 🏡❤️ My comfort zone My peace 🤍 You know what… when I’m with you, I become the happiest person in the world. Your happiness makes me happy, and your sadness touches my heart just the same so please aise roya mt kro na  bachha kisi dusro ke chakkar me apni in pyaari pyaari aankhon se aansu mt bahaya kro baby,aapka ye hasta hua chehra itna pyaara lgta hai🙈❤️
              and jab khush hoti ho tab ki awaaz 🥰 aap na bachha hamesha khush raha kro because I Love You so much I love you Too much I love you much much 😂❤️
              You know what? I feel so lucky to have you in this world. I truly feel like the luckiest person alive.🌏❤️
              Woh jo tum kehti ho na kya hoga tere bina toh tumhe sach batau na toh tumhare bina kuchh nahi hoga mera i will be helples but ik you are not going anywhere😌❤️ 
             It’s already been 2 years together, and many more to come ummm, I mean till my last breath.
In these two years, I’ve seen so many sides of you, from 🥰 to 🌚 and I’ve learned so many things too… jaise nakhre karna 😂😂
              I love iritating you mtlb mujhe bahut maza aata hai but fir kabhi kabhi fatt bhi jaati hai jab tu gussa hoti hai 😭😂
              But jaisa bhi hu peechha toh nahi chhodunga "EITHER I WILL BE YOUR HUSBAND OR YOUR HUSBAND'S MURDERER"😂😂
              Happy Birthday Again we will celebrate this birthday in grand ❤️🥳
              Happy Birthday Again Babygirl❤️
            
              💗
            </p>

            <p className="text-[#301733] mt-4 text-sm md:text-base italic">— Yours, Abdul</p>
          </div>
        </motion.div>
      )}

      {/* Replay / Back button */}
      <div className="mt-8 flex justify-center">
        {revealed ? (
          <GradientButton onClick={() => typeof onNext === "function" && onNext()}>
            Replay
          </GradientButton>
        ) : (
          // keep spacing consistent so layout doesn't jump
          <div className="h-0" />
        )}
      </div>
    </div>
  );
}
