"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingIconProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  variant?: "blue" | "white" | "slate" | "amber";
  className?: string;
  label?: string;
}

export function LoadingIcon({
  size = "md",
  variant = "blue",
  className,
  label,
}: LoadingIconProps) {
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 18
      : size === "md"
      ? 28
      : size === "lg"
      ? 42
      : 56;

  const colorClasses = {
    blue: {
      ring1: "stroke-[#2563eb]",
      ring2: "stroke-blue-300",
      node: "fill-[#2563eb]",
      text: "text-blue-900",
    },
    white: {
      ring1: "stroke-white",
      ring2: "stroke-white/40",
      node: "fill-white",
      text: "text-white",
    },
    slate: {
      ring1: "stroke-slate-900",
      ring2: "stroke-slate-300",
      node: "fill-slate-900",
      text: "text-slate-900",
    },
    amber: {
      ring1: "stroke-amber-500",
      ring2: "stroke-amber-200",
      node: "fill-amber-500",
      text: "text-amber-900",
    },
  }[variant];

  return (
    <div className={cn("inline-flex flex-col items-center justify-center gap-2.5", className)}>
      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: pixelSize, height: pixelSize }}
      >
        <svg
          viewBox="0 0 50 50"
          className="w-full h-full animate-spin"
          style={{ animationDuration: "1.4s", animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base track ring */}
          <circle
            cx="25"
            cy="25"
            r="20"
            className={colorClasses.ring2}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Dynamic rotating primary arc */}
          <circle
            cx="25"
            cy="25"
            r="20"
            className={colorClasses.ring1}
            strokeWidth="3.8"
            strokeDasharray="95 150"
            strokeDashoffset="0"
            strokeLinecap="round"
          />

          {/* Geometric inner compass facets */}
          <path
            d="M25 14L32 25L25 36L18 25Z"
            className={colorClasses.ring1}
            strokeWidth="2"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Center core node */}
          <circle cx="25" cy="25" r="3" className={colorClasses.node} />
        </svg>
      </div>

      {label && (
        <span className={cn("text-xs font-mono font-black tracking-wider uppercase", colorClasses.text)}>
          {label}
        </span>
      )}
    </div>
  );
}
