"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { ShieldCheck, Cpu, Radar, Database, Zap } from "lucide-react";
import { GooeyText } from "./gooey-text-morphing";

// Initialize Poppins font for this specific section
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// The morphing content lists for the LEFT side
const MORPH_TEXTS = [
  "Cybersecurity", 
  "Resource Management", 
  "Real-Time tracking", 
  "Productivity", 
  "Digital efficiency"
];

const MORPH_ICONS = [
  <ShieldCheck key="0" className="w-6 h-6 sm:w-8 sm:h-8" />,
  <Database key="1" className="w-6 h-6 sm:w-8 sm:h-8" />,
  <Radar key="2" className="w-6 h-6 sm:w-8 sm:h-8" />,
  <Zap key="3" className="w-6 h-6 sm:w-8 sm:h-8" />,
  <Cpu key="4" className="w-6 h-6 sm:w-8 sm:h-8" />
];

// Interactive Glassmorphic Images
const DRAGGABLE_IMAGES = [
  {
    title: "Global Architecture",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop",
  },
  {
    title: "Predictive Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&fit=crop",
  },
  {
    title: "Unified Teams",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop",
  },
  {
    title: "Zero-Trust Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=800&fit=crop",
  },
  {
    title: "Cognitive Workspace",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=800&fit=crop",
  },
];

export function AboutUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // --- Physics & Drag State ---
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();
  
  // Track Z-Index Order (Last item in array is on top)
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);

  const bringToFront = (idx: number) => {
    setOrder((prev) => {
      const newOrder = prev.filter((i) => i !== idx);
      newOrder.push(idx);
      return newOrder;
    });
  };

  // Stack Coordinates Engine
  const getCardTransform = (idx: number) => {
    const offset = idx - 2; // Maps 0-4 to -2, -1, 0, 1, 2
    return {
      x: offset * 30, // Horizontal spread
      y: Math.abs(offset) * 15, // Creates a beautiful arc
      rotate: offset * 6, // Fan rotation
    };
  };

  // Reset to stack when user leaves the section
  useEffect(() => {
    if (!isInView) {
      controls.start((i) => ({
        x: getCardTransform(i).x,
        y: getCardTransform(i).y,
        rotate: getCardTransform(i).rotate,
        transition: { type: "spring", stiffness: 80, damping: 15, mass: 1 },
      }));
      setOrder([0, 1, 2, 3, 4]); // Reset stacking order cleanly
    }
  }, [isInView, controls]);

  const storyText = "Imagine a typical workday in a modern business. Your team jumps from app to app, losing time and focus while security vulnerabilities multiply. We asked ourselves: What if a business didn't need to rent a dozen different digital rooms? What if there was a single, intelligent foundation designed to hold absolutely everything? That question led to the creation of Meroidea. We've replaced digital fragmentation with a unified, secure ecosystem tailored entirely to your operational DNA.";

  return (
    // Section acts as the boundary for dragging. Overflow-hidden keeps cards contained.
    <section 
      id="about" 
      ref={sectionRef} 
      className={`py-12 md:py-20 relative z-10 border-t border-gray-200 dark:border-white/5 bg-transparent transition-colors duration-300 overflow-hidden ${poppins.className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-12 items-center h-full">
          
          {/* --------------------------------------------------- */}
          {/* LEFT COMPARTMENT: NARRATIVE & CTA                   */}
          {/* --------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col relative pointer-events-auto"
          >
            <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-6 transition-colors duration-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              Our Mission
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-[1.1] tracking-tight transition-colors duration-300">
              The Meroidea <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
                Identity.
              </span>
            </h2>

            {/* Gooey Text Morphing & Animated Icons */}
            <div className="flex items-center gap-4 mb-6 h-[50px] sm:h-[60px] w-full mt-2">
               <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 shadow-inner overflow-hidden relative">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeIndex}
                     initial={{ opacity: 0, y: 15, scale: 0.8 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -15, scale: 0.8 }}
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                     className="absolute"
                   >
                     {MORPH_ICONS[activeIndex]}
                   </motion.div>
                 </AnimatePresence>
               </div>

               <GooeyText
                 texts={MORPH_TEXTS}
                 morphTime={1.2}
                 cooldownTime={2.0}
                 onIndexChange={setActiveIndex}
                 className="flex-1 h-full"
                 textClassName="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-gray-200 tracking-tight pointer-events-none"
               />
            </div>
            
            <div className="relative mb-8 pointer-events-none">
              <p className="text-slate-600 dark:text-gray-400 text-[15px] sm:text-base leading-relaxed max-w-xl font-light transition-colors duration-300">
                {storyText}
              </p>
            </div>

            <div className="self-start">
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl overflow-hidden shadow-lg transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    Know More
                    <motion.span 
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* --------------------------------------------------- */}
          {/* RIGHT COMPARTMENT: DRAGGABLE 3D GLASS STACK         */}
          {/* --------------------------------------------------- */}
          <div className="w-full relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
             {/* Dynamic Ambient Background Glows */}
             <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/20 dark:bg-cyan-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300 pointer-events-none" />
             <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300 pointer-events-none" />
             
             {/* Stack Container */}
             <div className="relative flex items-center justify-center w-full h-full">
               {DRAGGABLE_IMAGES.map((item, idx) => (
                 <motion.div
                   key={idx}
                   custom={idx}
                   animate={controls}
                   initial={getCardTransform(idx)}
                   drag
                   dragConstraints={sectionRef} // Bound to the outer section!
                   dragElastic={0.15} // Premium stiff resistance at edges
                   dragMomentum={true}
                   onPointerDown={() => bringToFront(idx)}
                   whileHover={{ scale: 1.05 }}
                   whileDrag={{ 
                     scale: 1.12, 
                     cursor: "grabbing", 
                     rotateX: 10, // Slight 3D tilt while dragging
                     rotateY: 10
                   }}
                   className="absolute cursor-grab active:cursor-grabbing origin-center"
                   style={{ 
                     zIndex: order.indexOf(idx) + 10,
                     perspective: 1000 
                   }}
                 >
                   {/* Realistic 3D Glassmorphism Card */}
                   <div className="p-3 bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.6)] rounded-[1.5rem] flex flex-col items-center pointer-events-none transition-shadow duration-300 group">
                      
                      {/* Image container with inner shadow */}
                      <div className="overflow-hidden rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.3)] bg-gray-200 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-52 w-36 sm:h-64 sm:w-48 lg:h-[22rem] lg:w-60 object-cover pointer-events-none" 
                          draggable={false} // Prevent browser default drag
                        />
                      </div>
                      
                      <h3 className="mt-3 mb-1 text-center text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-gray-100 drop-shadow-sm">
                        {item.title}
                      </h3>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}