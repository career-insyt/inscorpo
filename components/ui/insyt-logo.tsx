"use client";

import React from "react";
import Image from "next/image";

interface InsytLogoProps {
  variant?: "icon" | "full" | "auto";
  className?: string;
  size?: number;
}

export function InsytLogo({ variant = "icon", className = "", size = 32 }: InsytLogoProps) {
  if (variant === "icon") {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src="/logo/logo_white.png"
          alt="Career INSYT Logo"
          className="w-full h-full object-contain filter drop-shadow-sm rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Light theme logo */}
      <img
        src="/logo/logo.svg"
        alt="Career INSYT"
        className="dark:hidden h-full w-auto object-contain"
        style={{ height: size }}
      />
      {/* Dark theme logo */}
      <img
        src="/logo/logo-white.svg"
        alt="Career INSYT"
        className="hidden dark:block h-full w-auto object-contain"
        style={{ height: size }}
      />
    </div>
  );
}
