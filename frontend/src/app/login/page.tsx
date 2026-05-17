"use client";

import React from "react";
import { AuthSwitch } from "../../components/ui/auth-switch";
import { SparklesCore } from "../../components/ui/sparkles";
import { ScrollNavigationMenu } from "../../components/ui/scroll-navigation-menu";
import ShaderBackground from "../../components/ui/shader-background"; // <-- Imported Shader Background

export default function LoginPage() {
  return (
    // Responsive background container with smooth theme transitions
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden flex flex-col">
      
      {/* THE NAVBAR */}
      <ScrollNavigationMenu />

      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0">
        
        {/* Dynamic Shader Canvas Grid Effect (Matches Testimonials section) */}
        <ShaderBackground />

        {/* Ambient Blurred Colored Vector Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 dark:bg-cyan-600/20 blur-[120px] pointer-events-none" />

        {/* Starfield Sparkle Matrix Layer */}
        <SparklesCore
          id="loginparticles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#818cf8"
        />
      </div>

      {/* CONTENT CORE CONTAINER */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 pt-24 pb-12">
        <AuthSwitch />
      </div>

    </main>
  );
}