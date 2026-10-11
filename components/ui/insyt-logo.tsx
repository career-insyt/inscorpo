"use client";

import React from "react";

interface InsytLogoProps {
  variant?: "icon" | "full" | "auto";
  className?: string;
  size?: number;
  darkBg?: boolean;
}

export function InsytLogo({ variant = "icon", className = "", size = 32, darkBg = false }: InsytLogoProps) {
  if (variant === "icon") {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 bg-blue-600 rounded-lg p-1 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src="/logo/logo_white.png"
          alt="Career INSYT Logo"
          className="w-full h-full object-contain filter drop-shadow-sm"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center gap-2.5 ${className}`}>
      <div
        className="flex items-center justify-center bg-blue-600 rounded-lg p-1 shadow-sm flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo/logo_white.png"
          alt="Career INSYT Logo"
          className="w-full h-full object-contain filter drop-shadow-sm"
        />
      </div>
      <img
        src={darkBg ? "/logo/logoTextWhite.png" : "/logo/logoTextDark.png"}
        alt="CAREERINSYT"
        className="w-auto object-contain"
        style={{ height: Math.max(18, Math.round(size * 0.7)) }}
      />
    </div>
  );
}

