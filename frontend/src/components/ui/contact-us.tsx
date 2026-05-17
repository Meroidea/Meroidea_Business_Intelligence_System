"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { PinContainer } from "./3d-pin"; 

// --- Local ClassName Utility (Replaces external utils file) ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// --- Phone Icon ---
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-6 h-6", className)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.018a14.996 14.996 0 01-6.712-6.712l2.018-1.514a1.125 1.125 0 00.417-1.173L7.106 3.091a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

// --- Mail Icon ---
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-6 h-6", className)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

// --- 3D Animated Pin (Sydney Map Location) ---
const SydneyLocationPin = () => {
  return (
    <div className="w-full flex items-center justify-center mt-2 min-h-[350px]">
      <PinContainer title="Sydney, Australia" href="https://maps.google.com/?q=Sydney">
        <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-lg text-slate-900 dark:text-slate-100 transition-colors duration-300">
            Meroidea HQ
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
              Sydney, New South Wales, Australia.
            </span>
          </div>
          
          <div 
            className="flex flex-1 w-full rounded-lg mt-4 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-transparent to-cyan-500/30 mix-blend-overlay"></div>
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-lg"></div>
          </div>
        </div>
      </PinContainer>
    </div>
  );
};

// --- Modern Form Field ---
const FormField = ({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const isTextArea = props.type === "textarea";
  return (
    <div className="flex flex-col gap-1.5 mb-6">
      <label htmlFor={id} className="text-sm font-medium text-slate-800 dark:text-slate-300">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          className="p-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white/40 dark:bg-black/40 text-slate-900 dark:text-white backdrop-blur-sm shadow-inner focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 h-32 resize-none"
          {...props}
        />
      ) : (
        <input
          id={id}
          className="p-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white/40 dark:bg-black/40 text-slate-900 dark:text-white backdrop-blur-sm shadow-inner focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          {...props}
        />
      )}
    </div>
  );
};

export function ContactUsSection() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftColumnY = useTransform(scrollYProgress, [0, 1], ["0px", "-50px"]);
  const formRotateX = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const formY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section ref={ref} id="contact" className="py-16 md:py-24 relative z-10 border-t border-gray-200 dark:border-white/5 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,2fr] gap-16 lg:gap-20">
          
          {/* Left Column */}
          <motion.div style={{ y: leftColumnY }} className="flex flex-col gap-6">
            <div>
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg">
                <MailIcon className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white transition-colors duration-300">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">us</span>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl transition-colors duration-300">
                We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 border-t border-gray-100 dark:border-white/5 pt-5">
              <div className="flex items-center gap-3.5 group">
                <PhoneIcon className="text-indigo-600 group-hover:text-cyan-500 transition-colors" />
                <a href="tel:+1800123XX21" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  +1 (800) 123 XX21
                </a>
              </div>
              <div className="flex items-center gap-3.5 group">
                <MailIcon className="text-indigo-600 group-hover:text-cyan-500 transition-colors" />
                <a href="mailto:support@meroidea.com" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  support@meroidea.com
                </a>
              </div>
            </div>

            <SydneyLocationPin />

          </motion.div>

          {/* Right Column */}
          <div className="lg:pt-16" style={{ perspective: "1000px" }}>
            <motion.form 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              style={{
                rotateX: formRotateX,
                y: formY,
                opacity: formOpacity,
                transformStyle: "preserve-3d",
              }}
              className="relative p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl shadow-2xl dark:shadow-[0_0_80px_rgba(79,70,229,0.15)] overflow-hidden group transition-colors duration-300"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/5 dark:from-indigo-500/10 to-transparent pointer-events-none" />

              <motion.div custom={0} variants={formVariants}>
                <FormField label="Full name" id="full_name" type="text" placeholder="Sujan Darji" />
              </motion.div>
              <motion.div custom={1} variants={formVariants}>
                <FormField label="Email Address" id="email" type="email" placeholder="sujan@meroidea.com" />
              </motion.div>
              <motion.div custom={2} variants={formVariants}>
                <FormField label="Company" id="company" type="text" placeholder="Meroidea LLC" />
              </motion.div>
              <motion.div custom={3} variants={formVariants}>
                <FormField label="Message" id="message" type="textarea" placeholder="Type your message here..." />
              </motion.div>
              
              <motion.div custom={4} variants={formVariants} className="flex justify-end">
                <button 
                  type="submit" 
                  className="px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
                >
                  Send Message
                </button>
              </motion.div>
            </motion.form>
          </div>
          
        </div>
      </div>
    </section>
  );
}