"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // BULLETPROOF SCROLL DETECTION: Native browser event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check immediately on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // BULLETPROOF POSITIONING: 'fixed left-0 right-0' immune to overflow bugs
    <div className="fixed top-0 left-0 right-0 pt-4 z-[100] flex w-full justify-center px-4 pointer-events-none transition-all">
      <motion.nav
        initial={false}
        animate={{
          maxWidth: isScrolled ? "800px" : "1280px",
          paddingTop: isScrolled ? "0.5rem" : "0.75rem",
          paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
          borderRadius: isScrolled ? "2rem" : "1rem",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="w-full bg-white/80 dark:bg-[#111111]/80 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-sm px-4 pointer-events-auto"
      >
        {children}
      </motion.nav>
    </div>
  );
};

export const NavBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="hidden md:flex items-center justify-between w-full">{children}</div>;
};

export const NavbarLogo = () => {
  return (
    <Link href="/dashboard" className="text-xl font-bold tracking-wider text-slate-900 dark:text-white">
      MEROIDEA
    </Link>
  );
};

export const NavItems = ({ items }: { items: { name: string; link: string }[] }) => {
  return (
    <div className="flex items-center gap-6">
      {items.map((item, idx) => (
        <Link key={idx} href={item.link} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export const NavbarButton = ({ children, variant, onClick, className = "" }: { children: React.ReactNode, variant: "primary" | "secondary", onClick?: () => void, className?: string }) => {
  const baseStyle = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
  const primaryStyle = "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm";
  const secondaryStyle = "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variant === "primary" ? primaryStyle : secondaryStyle} ${className}`}>
      {children}
    </button>
  );
};

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
  return <div className="md:hidden w-full flex flex-col">{children}</div>;
};

export const MobileNavHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between w-full">{children}</div>;
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick} className="text-gray-600 dark:text-gray-300 focus:outline-none p-1">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
};

export const MobileNavMenu = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden mt-4 flex flex-col gap-4 border-t border-gray-200 dark:border-white/10 pt-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};