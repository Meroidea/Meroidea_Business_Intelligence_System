"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ShaderBackground from "@/components/ui/shader-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { ScrollNavigationMenu } from "@/components/ui/scroll-navigation-menu";
import { Footer } from "@/components/ui/footer";
import { Poppins } from "next/font/google";
import { 
  ShieldCheck, Cpu, Network, Zap, 
  Boxes, Fingerprint, Globe, Rocket 
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Custom Menu Items for About Page (Removing "About Us")
const aboutPageMenu = [
  { id: 1, title: "HOME", url: "/", icon: <Boxes className="w-4 h-4" /> },
  { 
    id: 2, 
    title: "RESOURCES", 
    url: "#", 
    icon: <Boxes className="w-4 h-4" />,
    children: [
      { id: 21, title: "For Developers", url: "/#developers", description: "API and SDKs.", icon: <Rocket className="w-4 h-4" /> },
      { id: 22, title: "For Business", url: "/#business", description: "Enterprise tools.", icon: <Boxes className="w-4 h-4" /> }
    ]
  },
  { id: 4, title: "CONTACT US", url: "/#contact", icon: <Network className="w-4 h-4" /> }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Hero Parallax Transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  const heroZ = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  return (
    <div ref={containerRef} className={`min-h-screen bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative ${poppins.className}`}>
      
      {/* --------------------------------------------------- */}
      {/* GLOBAL BACKGROUND ELEMENTS                          */}
      {/* --------------------------------------------------- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <SparklesCore id="about-sparkles" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={80} className="w-full h-full" particleColor="#818cf8" />
      </div>

      <ScrollNavigationMenu />

      {/* --------------------------------------------------- */}
      {/* HERO SECTION: SHADER BACKGROUND ENABLED             */}
      {/* --------------------------------------------------- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Testimonials-style Shader Background */}
        <div className="absolute inset-0 z-0">
          <ShaderBackground />
          <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, translateZ: heroZ }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase mb-8"
          >
            The Story of MEROIDEA: An Evolution of Intelligence
          </motion.div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-purple-500 animate-gradient-x">
              Future of Work.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-700 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            Meroidea was born from a single realization: The modern enterprise is drowning in its own tools. We built the cure.
          </p>
        </motion.div>
        
        {/* Cinematic Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-indigo-500/30 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-indigo-500 rounded-full" />
        </motion.div>
      </section>

      {/* --------------------------------------------------- */}
      {/* NARRATIVE CHAPTERS: TIGHT PARALLAX FLOW             */}
      {/* --------------------------------------------------- */}
      <main className="relative z-10 -mt-20">
        
        {/* Chapter 1: The Fragmentation */}
        <NarrativeChapter 
          number="01"
          title="The Mosaic of Chaos"
          tag="The Past"
          content="Before Meroidea, work was a scattered puzzle. Communication in one tab, documents in another, scheduling in a third. This digital fragmentation created a 'context-switching tax' that bled billions in productivity and opened silent security backdoors. Businesses weren't operating; they were just managing their chaos."
          image="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop"
          icon={<Network className="w-8 h-8" />}
          progress={smoothProgress}
          range={[0.1, 0.3]}
        />

        {/* Chapter 2: The Genesis */}
        <NarrativeChapter 
          number="02"
          title="A Living Organism"
          tag="The Vision"
          content="We asked: What if your workspace behaved like a single, intelligent living organism? One where AI didn't just 'assist' but actively connected your financial tools to your staff rosters, and your documents to your defensive perimeter. Meroidea was engineered as that singular, unbreakable digital DNA."
          image="https://images.unsplash.com/photo-1620712943543-bcc4638ef808?q=80&w=2000&auto=format&fit=crop"
          icon={<Boxes className="w-8 h-8" />}
          progress={smoothProgress}
          range={[0.25, 0.45]}
          reverse
        />

        {/* Chapter 3: The Fortress */}
        <NarrativeChapter 
          number="03"
          title="Ironclad Sovereignty"
          tag="The Security"
          content="In an era of deepfakes and data breaches, trust is the only currency. We built Meroidea inside a zero-trust fortress. Granular audit logs, behavioral AI analysis, and real-time IP tracking ensure that your intellectual property remains exactly that: yours. We don't just secure data; we provide digital sovereignty."
          image="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop"
          icon={<Fingerprint className="w-8 h-8" />}
          progress={smoothProgress}
          range={[0.4, 0.6]}
        />

        {/* Chapter 4: The Horizon */}
        <NarrativeChapter 
          number="04"
          title="Empowering Growth"
          tag="The Future"
          content="Today, Meroidea scales with you. Whether you are a boutique agency or a global powerhouse, our integrated LMS, financial intelligence, and native communications provide the ultimate competitive edge. We've stopped the app-hopping. Now, we are just starting the revolution."
          image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
          icon={<Globe className="w-8 h-8" />}
          progress={smoothProgress}
          range={[0.55, 0.8]}
          reverse
        />

      </main>

      {/* --------------------------------------------------- */}
      {/* FINAL PILLAR: CINEMATIC CTA                         */}
      {/* --------------------------------------------------- */}
      {/*<section className="relative z-20 py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5 dark:bg-indigo-500/5 backdrop-blur-3xl" />
        
       <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center px-6"
        >
          <Zap className="w-16 h-16 text-indigo-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Ready to unify?</h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-10 text-lg">
            Experience the singular foundation designed for modern performance.
          </p>
          <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
            Start Your Journey
          </button>
        </motion.div>
      </section>*/}

      <Footer />
    </div>
  );
}

// --- MICRO COMPONENT: CINEMATIC NARRATIVE CHAPTER ---

function NarrativeChapter({ number, title, tag, content, image, icon, progress, range, reverse = false }: any) {
  const ref = useRef(null);
  
  // High-End Parallax Curves
  const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 1, 1, 0]);
  const scale = useTransform(progress, [range[0], range[1]], [0.8, 1.1]);
  const y = useTransform(progress, [range[0], range[1]], [150, -150]);
  const imgRotate = useTransform(progress, [range[0], range[1]], reverse ? [-5, 5] : [5, -5]);

  return (
    <div ref={ref} className="relative min-h-[90vh] flex items-center justify-center pointer-events-none">
      <motion.div 
        style={{ opacity, scale, y }}
        className={`max-w-7xl mx-auto px-6 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
      >
        {/* Visual Side */}
        <div className="w-full lg:w-1/2 relative perspective-[1200px]">
          <motion.div 
            style={{ rotateY: imgRotate }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 aspect-[4/5] lg:aspect-square"
          >
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent" />
            
            {/* Float Floating Icon */}
            <div className="absolute bottom-10 left-10 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-white">
              {icon}
            </div>
          </motion.div>
        </div>

        {/* Text Side */}
        <div className="w-full lg:w-1/2 text-left space-y-6 pointer-events-auto">
          <div className="flex items-center gap-4">
            <span className="text-7xl md:text-9xl font-black text-indigo-500/10 dark:text-white/5 leading-none">
              {number}
            </span>
            <div className="h-px flex-1 bg-indigo-500/20" />
          </div>
          
          <h4 className="text-indigo-600 dark:text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs">
             Chapter {number} — {tag}
          </h4>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-tight">
            {title}
          </h3>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed">
            {content}
          </p>
        </div>
      </motion.div>
    </div>
  );
}