"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// --- Local ClassName Utility (Replaces external utils file) ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  // Pre-calculated random rotations to prevent Next.js hydration errors
  const rotations = [-10, 8, -5, 12, -8, 5, -12, 10]; 

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  return (
    <div className={cn("max-w-sm md:max-w-6xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-10", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        
        {/* Left Side: 3D Image Stack */}
        <div>
          <div className="relative h-[28rem] w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index % rotations.length],
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index % rotations.length],
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index % rotations.length],
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-[0_0_30px_rgba(79,70,229,0.2)] border border-white/10"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Right Side: Animated Quote and Details */}
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-3xl font-bold dark:text-white text-slate-900 transition-colors duration-300">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-medium tracking-wide transition-colors duration-300">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-slate-600 mt-8 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          
          {/* Navigation Controls */}
          <div className="flex gap-4 pt-12 md:pt-0 mt-8">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-white/10 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-white/5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-900 dark:text-white group-hover/button:-rotate-12 transition-transform duration-300"><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-white/10 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-white/5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-900 dark:text-white group-hover/button:rotate-12 transition-transform duration-300"><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};