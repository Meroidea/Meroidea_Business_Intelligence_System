"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
}: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}) => {
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const generatedId = useId();

  if (!init) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn("absolute inset-0", className)}
    >
      <Particles
        id={id || generatedId}
        className={cn("h-full w-full")}
        options={{
          background: { color: { value: background || "transparent" } },
          fullScreen: { enable: false, zIndex: 1 },
          fpsLimit: 120,
          
          // --- UPDATED: Advanced Mouse Interaction ---
          interactivity: {
            events: {
              onHover: {
                enable: true,
                // Combine "bubble" (glow) and "slow" (less movement)
                mode: ["bubble", "slow"], 
                parallax: {
                  enable: true,
                  force: 40,     // Slightly gentler 3D shift
                  smooth: 10,
                },
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              bubble: {
                distance: 150,   // Radius around cursor to trigger glow
                size: 2.7,       // Slightly enlarge the particles
                duration: 0.3,
                opacity: 2.9,      // Maximize opacity to make them shine brighter
              },
              slow: {
                factor: 4,       // Divides particle speed by 4 near the cursor
                radius: 150,     // The radius of the slow-down field
              },
            },
          },
          // ------------------------------------------

          particles: {
            color: { value: particleColor || "#ffffff" },
            move: {
              enable: true,
              direction: "none",
              outModes: { default: "out" },
              random: true,
              speed: { min: 0.1, max: speed || 1 },
              straight: false,
            },
            number: {
              density: { enable: true, width: 400, height: 400 },
              value: particleDensity || 200,
            },
            opacity: {
              // Base opacity is kept low so the "bubble" effect stands out
              value: { min: 0.9, max: 1 },
              animation: { enable: true, speed: 1, sync: false },
            },
            size: {
              value: { min: minSize || 1, max: maxSize || 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
};