"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  X,
  Upload,
  Move,
  Camera,
  Sparkles,
} from "lucide-react";

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onSaveCrop: (croppedDataUrl: string) => void;
  onPickNewFile?: () => void;
}

export function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onSaveCrop,
  onPickNewFile,
}: ImageCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset zoom and pan on open or imageSrc change
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(3, Math.max(0.8, prev + delta)));
  };

  const handleApplyCrop = () => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    const canvas = document.createElement("canvas");
    const outputSize = 400; // 400x400 high-res avatar
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Viewport diameter is 240px
    const viewportSize = 240;
    const scale = outputSize / viewportSize;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outputSize, outputSize);

    // Save context state
    ctx.save();
    // Move to center of canvas
    ctx.translate(outputSize / 2, outputSize / 2);
    // Apply pan scaled up
    ctx.translate(pan.x * scale, pan.y * scale);
    // Apply zoom
    ctx.scale(zoom * scale, zoom * scale);

    // Draw the image centered
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    // Render scaled to fit container at 1x
    const aspect = imgWidth / imgHeight;
    let renderW = viewportSize;
    let renderH = viewportSize;
    if (aspect > 1) {
      renderW = viewportSize * aspect;
    } else {
      renderH = viewportSize / aspect;
    }

    ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);
    ctx.restore();

    const croppedUrl = canvas.toDataURL("image/jpeg", 0.9);
    onSaveCrop(croppedUrl);
    onClose();
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-lg bg-corp-surface border-2 border-blue-500 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.35)] overflow-hidden flex flex-col font-mono"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-corp-border bg-gradient-to-r from-blue-900/30 to-corp-surface flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                <Camera size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-corp-text uppercase tracking-wider">
                  Crop &amp; Zoom Avatar
                </h3>
                <p className="text-[10px] text-corp-text-tertiary">
                  Drag to pan • Slider to zoom in / out
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-corp-text-tertiary hover:text-corp-text hover:bg-corp-bg-secondary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body: Interactive Crop Viewport */}
          <div className="p-6 space-y-6">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              className="relative w-64 h-64 mx-auto rounded-3xl overflow-hidden border-2 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.25)] bg-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            >
              {/* Image with transform */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                draggable={false}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transition: isDragging ? "none" : "transform 0.05s ease-out",
                  maxWidth: "none",
                  maxHeight: "none",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              {/* Viewport circular mask border */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-blue-400/80 shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.45)]" />

              {/* Center crosshair grid overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                <div className="w-full h-[1px] bg-white border-t border-dashed border-white" />
                <div className="h-full w-[1px] bg-white border-l border-dashed border-white absolute" />
              </div>

              {/* Pan hint badge */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-[9px] text-white/80 flex items-center gap-1">
                <Move size={10} /> Drag to Reposition
              </div>
            </div>

            {/* Zoom Slider & Controls */}
            <div className="space-y-2 max-w-sm mx-auto">
              <div className="flex items-center justify-between text-xs text-corp-text-secondary">
                <span className="flex items-center gap-1 font-bold">
                  <ZoomIn size={13} className="text-blue-400" /> Zoom Level
                </span>
                <span className="font-bold text-blue-400">{Math.round(zoom * 100)}%</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.max(0.8, prev - 0.15))}
                  className="p-1.5 rounded-lg bg-corp-bg-secondary hover:bg-corp-border text-corp-text transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>

                <input
                  type="range"
                  min="0.8"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-corp-border rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <button
                  type="button"
                  onClick={() => setZoom((prev) => Math.min(3, prev + 0.15))}
                  className="p-1.5 rounded-lg bg-corp-bg-secondary hover:bg-corp-border text-corp-text transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className="p-1.5 rounded-lg bg-corp-bg-secondary hover:bg-corp-border text-corp-text-secondary hover:text-corp-text transition-colors"
                  title="Reset Zoom & Pan"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-corp-border">
              {onPickNewFile ? (
                <button
                  type="button"
                  onClick={onPickNewFile}
                  className="flex items-center gap-1.5 text-xs text-corp-text-secondary hover:text-corp-text py-2 px-3 rounded-xl hover:bg-corp-bg-secondary transition-colors"
                >
                  <Upload size={13} /> Change Image
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-corp-text-secondary hover:bg-corp-bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyCrop}
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase text-white bg-blue-600 hover:bg-blue-500 shadow-[0_4px_14px_rgba(37,99,235,0.4)] transition-all flex items-center gap-1.5"
                >
                  <Check size={14} /> Crop &amp; Save
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
