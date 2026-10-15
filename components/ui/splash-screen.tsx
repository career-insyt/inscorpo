"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);

  const triggerSplash = useCallback(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Expose programmatic replay hook for manual preview & audit
    if (typeof window !== "undefined") {
      (window as any).__replayInsytSplash = triggerSplash;
    }

    // Show splash screen on first visit per browser session
    const hasSeenSplash = sessionStorage.getItem("careerinsyt_splash_shown");
    if (!hasSeenSplash) {
      sessionStorage.setItem("careerinsyt_splash_shown", "true");
      const cleanup = triggerSplash();
      return cleanup;
    }
  }, [triggerSplash]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="insyt-vector-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#1d4ed8] select-none text-white pointer-events-auto"
        >
          {/* Main Logo & Vector Line Animation */}
          <div className="flex flex-col items-center justify-center space-y-6 max-w-sm px-6 text-center">
            {/* Vector Monogram Smooth Line Drawing */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Outer Hexagonal Shield Outline */}
                <motion.polygon
                  points="60,10 105,35 105,85 60,110 15,85 15,35"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Inner Chevron & Dynamic Growth Facets */}
                <motion.path
                  d="M35 70 L60 40 L85 70"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />

                <motion.path
                  d="M60 40 L60 85"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />

                <motion.path
                  d="M45 55 L75 55"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Vector Nodes */}
                <motion.circle
                  cx="60"
                  cy="40"
                  r="3.5"
                  fill="#ffffff"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                />
                <motion.circle
                  cx="35"
                  cy="70"
                  r="3"
                  fill="#ffffff"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                />
                <motion.circle
                  cx="85"
                  cy="70"
                  r="3"
                  fill="#ffffff"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                />
              </svg>

              {/* All-White Official Logo Stamp Reveal */}
              <motion.img
                src="/logo/logo_white.png"
                alt="INSYT Vector Monogram"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 m-auto w-16 h-16 object-contain pointer-events-none"
              />
            </div>

            {/* Typography: Official White Logo Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center space-y-2"
            >
              <img
                src="/logo/logoTextWhite.png"
                alt="CAREERINSYT"
                className="h-7 sm:h-8 w-auto object-contain brightness-200"
              />
              <span className="text-[11px] font-mono font-black tracking-[0.3em] uppercase text-white/90">
                The Career Operating System
              </span>
            </motion.div>

            {/* Vector Smooth Progress Line */}
            <div className="w-48 h-0.5 bg-white/20 rounded-full overflow-hidden mt-4">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
