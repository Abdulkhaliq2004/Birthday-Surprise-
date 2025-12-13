"use client";

import GradientButton from "../GradientButton";
import { Gift } from "lucide-react";

export default function IntroScreen({ onNext }) {
  return (
    <div className="py-10 md:py-14 text-center">
      <div className="flex flex-col items-center gap-6">

        {/* Polaroid card */}
        <div className="flex justify-center mb-6">
          <div className="
  bg-white p-3 rounded-xl 
  shadow-[0_10px_25px_rgba(0,0,0,0.4)] 
  w-[240px] 
  rotate-[-2deg] 
  hover:rotate-0 
  transform 
  hover:scale-[1.03] 
  transition 
  duration-300
">

            <img
              src="/gifs/intro.jpg.jpeg"
              alt="Baby photo"
              className="w-full h-[300px] object-cover rounded-md"
            />
            <p className="mt-2 text-center text-sm font-semibold text-gray-600">
              Baby Daxsaab ❤️
            </p>
          </div>
        </div>

        {/* Heading + subtitle */}
        <div>
          <h1
            className="text-pretty text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-300 leading-tight"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,105,180,0.45))" }}
          >
            My Babygirl was born today, 25 years ago!
          </h1>

          <p className="mt-4 text-xl text-pink-200 italic">
            Yes, it's YOU DAXSAAB! A little surprise awaits...
          </p>
        </div>

        {/* Button */}
        <div className="mt-8">
          <GradientButton onClick={() => onNext?.()}>
            <Gift size={20} /> Start the surprise
          </GradientButton>
        </div>

      </div>
    </div>
  );
}
