"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200 });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth });
    handleResize(); // trigger on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = dimensions.width <= 768;
  const isTablet = dimensions.width > 768 && dimensions.width <= 1024;
  const isDesktop = dimensions.width > 1024;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- CINEMATIC 3D TRANSFORMS ---
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [70, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 0.7 : 0.85, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.4], [0, 0]);

  // --- PERFECTLY HIDDEN TEXT REVEAL ---
  // Calculates exactly how deep to push the text to hide it on every device size.
  // Desktop goes deeper (450) to prevent the bug from Image 4!
  const titleStartDepth = isMobile ? 200 : isTablet ? 300 : 450;
  const titleTranslateY = useTransform(
    scrollYProgress, 
    [0, 0.4], 
    [titleStartDepth, isMobile ? -80 : -150]
  );
  
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  return (
    <div
      // FIX: Drastically reduced container heights to eliminate dead space underneath!
      className="h-[45rem] md:h-[55rem] lg:h-[65rem] flex items-start justify-center relative p-2 md:p-20 w-full pt-10"
      ref={containerRef}
    >
      <div
        className="w-full relative flex flex-col items-center justify-start"
        style={{ perspective: "1200px" }} 
      >
        {/* Title Section (Layered Behind Tablet - z-10) */}
        <motion.div
          style={{
            y: titleTranslateY,
            opacity: titleOpacity,
          }}
          className="max-w-5xl mx-auto text-center z-10 absolute top-0 left-0 right-0 pointer-events-none"
        >
          {titleComponent}
        </motion.div>

        {/* 3D Animated Tablet Container (Layered in Front - z-20) */}
        <motion.div
          style={{
            rotateX,
            scale,
            y: translateY,
            transformStyle: "preserve-3d",
          }}
          className="max-w-6xl mx-auto h-[30rem] md:h-[45rem] w-full border-4 border-white/10 bg-[#111111] rounded-3xl p-2 md:p-4 shadow-[0_0_80px_rgba(79,70,229,0.2)] z-20 relative mt-0"
        >
          <div className="h-full w-full bg-black rounded-2xl overflow-hidden border border-white/5 relative flex flex-col">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};