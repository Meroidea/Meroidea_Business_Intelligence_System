"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; // Only importing the UI icon now!

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-gray-200 dark:border-white/5 bg-slate-50 dark:bg-[#0A0A0A] pt-20 pb-10 overflow-hidden transition-colors duration-500">
      
      {/* --- CINEMATIC BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 mix-blend-overlay">
        <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- MAIN FOOTER CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="group flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                M
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                Meroidea.
              </span>
            </Link>
            <p className="text-slate-500 dark:text-gray-400 font-light leading-relaxed max-w-sm mb-8 transition-colors">
              The intelligent foundation for modern enterprises. We engineer secure, unified cognitive workspaces tailored entirely to your operational DNA.
            </p>
            
            {/* 3D Magnetic Social Links (Using Native SVGs) */}
            <div className="flex items-center gap-4">
              <MagneticSocialIcon href="https://twitter.com" icon={<TwitterIcon className="w-4 h-4" />} />
              <MagneticSocialIcon href="https://github.com" icon={<GithubIcon className="w-4 h-4" />} />
              <MagneticSocialIcon href="https://linkedin.com" icon={<LinkedinIcon className="w-4 h-4" />} />
              <MagneticSocialIcon href="https://discord.com" icon={<DiscordIcon className="w-4 h-4" />} />
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-bold tracking-widest uppercase text-xs mb-2 transition-colors">Product</h4>
            <FooterLink href="/workspace">Cognitive Workspace</FooterLink>
            <FooterLink href="/security">Cyber-Defense</FooterLink>
            <FooterLink href="/empowerment">LMS Engine</FooterLink>
            <FooterLink href="/pricing">Pricing Plans</FooterLink>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-bold tracking-widest uppercase text-xs mb-2 transition-colors">Resources</h4>
            <FooterLink href="/docs">Documentation</FooterLink>
            <FooterLink href="/api">API Reference</FooterLink>
            <FooterLink href="/blog">Engineering Blog</FooterLink>
            <FooterLink href="/community">Community Forum</FooterLink>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-bold tracking-widest uppercase text-xs mb-2 transition-colors">Company</h4>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/careers">Careers <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold uppercase">Hiring</span></FooterLink>
            <FooterLink href="/contact">Contact Support</FooterLink>
            <FooterLink href="/legal">Privacy & Terms</FooterLink>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-500">
          <p className="text-sm text-slate-500 dark:text-gray-500 font-medium transition-colors">
            © {currentYear} Meroidea LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-500 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  );
}

// --- MICRO COMPONENTS ---

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="group relative text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-cyan-400 font-medium text-sm transition-colors duration-300 w-fit flex items-center gap-1"
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400 group-hover:w-full transition-all duration-500 ease-out" />
    </Link>
  );
}

function MagneticSocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-20, 20], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-20, 20], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: xSpring, y: ySpring, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:border-indigo-500/50 dark:hover:border-cyan-500/50 shadow-sm transition-colors duration-300 z-10"
    >
      <div style={{ transform: "translateZ(20px)" }}>{icon}</div>
    </motion.a>
  );
}

// --- NATIVE BRAND SVGS ---

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 100.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
     <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);