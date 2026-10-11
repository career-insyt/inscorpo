"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show splash screen on first visit per browser session
    const hasSeenSplash = sessionStorage.getItem("careerinsyt_splash_shown");
    if (!hasSeenSplash) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("careerinsyt_splash_shown", "true");
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F0F7FF]/95 backdrop-blur-2xl pointer-events-none select-none"
        >
          {/* Subtle Ambient Gold & Sky Blue Glow */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-amber-400/20 via-blue-400/20 to-amber-300/15 blur-3xl" />

          {/* 3D Rotating Logo Container with Metallic Gold Glow */}
          <motion.div
            initial={{ scale: 0.75, rotateY: 0 }}
            animate={{
              scale: [0.75, 1.05, 1],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ perspective: 1000 }}
            className="relative"
          >
            {/* Metallic Gold Halo Ring */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 25px rgba(245, 158, 11, 0.4), 0 0 60px rgba(217, 119, 6, 0.25)",
                  "0 0 45px rgba(251, 191, 36, 0.65), 0 0 95px rgba(245, 158, 11, 0.4)",
                  "0 0 30px rgba(245, 158, 11, 0.45), 0 0 70px rgba(217, 119, 6, 0.3)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#1E40AF] via-[#2563EB] to-[#60A5FA] p-2.5 flex items-center justify-center border-2 border-amber-300/80"
            >
              <img
                src="/logo/logo_white.png"
                alt="CAREERINSYT Icon"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]"
              />
            </motion.div>

            {/* Corner Gold Sparkle Accents */}
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-amber-400 animate-ping opacity-75" />
          </motion.div>

          {/* Typeface Logo below */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 flex flex-col items-center space-y-1"
          >
            <img
              src="/logo/logoTextDark.png"
              alt="CAREERINSYT"
              className="h-7 w-auto object-contain filter drop-shadow-sm"
            />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-blue-600">
              The Career Operating System
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
