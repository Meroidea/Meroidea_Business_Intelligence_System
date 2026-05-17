"use client";

import ShaderBackground from "../components/ui/shader-background";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { Footer } from "../components/ui/footer";
import { SparklesCore } from "../components/ui/sparkles";
import { ContactUsSection } from "../components/ui/contact-us";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials"; 
import { TabletDashboard } from "../components/ui/tablet-dashboard"; 
import { ScrollNavigationMenu } from "../components/ui/scroll-navigation-menu";
import { AboutUsSection } from "../components/ui/about-us";
import { WavyBackground } from "../components/ui/wavy-background"; 
import { Cpu, ShieldCheck, Zap, ArrowRight, Send, CheckCircle, Loader2 } from "lucide-react"; // <-- Added CheckCircle & Loader2

export default function LandingPage() {
  const { scrollY } = useScroll();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [hoveredScaleCard, setHoveredScaleCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Hero Parallax
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Background Blobs Parallax
  const bgY1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -200]);

  // Testimonials 3D Parallax Setup
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: testScrollY } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"],
  });
  
  const testY = useTransform(testScrollY, [0, 1], [150, -150]);
  const testScale = useTransform(testScrollY, [0, 0.5, 1], [0.85, 1, 0.85]);
  const testOpacity = useTransform(testScrollY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const testimonials = [
    {
      quote: "Meroidea completely transformed how our engineering team operates. The AI integrations saved us hundreds of hours in sprint planning and code reviews.",
      name: "Sarah Chen",
      designation: "CTO at TechFlow",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote: "The dashboard is incredibly intuitive. We migrated our entire enterprise workflow over in less than a week without a single hiccup in our operations.",
      name: "Marcus Rodriguez",
      designation: "VP of Engineering at ScaleUp Inc.",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    },
    {
      quote: "Security was our top concern. Meroidea's Row Level Security and RBAC gave us the peace of mind we needed to scale our multi-tenant SaaS.",
      name: "Emily Watson",
      designation: "Lead Security Architect",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const scaleCards = [
    {
      title: "Unified Cognitive Workspace",
      subtitle: "Seamlessly converge your operations, intelligence, and people.",
      desc: "We’ve eliminated the friction of app-hopping. Experience a centralized digital headquarters where AI-driven document processing, real-time team communication, advanced financial routing, and dynamic staff rostering happen in one secure, fluid environment. Tailored entirely to your operational DNA.",
      icon: <Cpu className="w-7 h-7" />,
      link: "/workspace"
    },
    {
      title: "Predictive Cyber-Defense & Analytics",
      subtitle: "Military-grade security that thinks before it acts.",
      desc: "Traditional security is reactive; Meroidea is proactive. Operating on a strict Role-Based Access Control (RBAC) foundation, our platform utilizes advanced behavioral AI, granular audit logging, and intelligent IP tracking to detect, analyze, and neutralize suspicious activity before it breaches your perimeter.",
      icon: <ShieldCheck className="w-7 h-7" />,
      link: "/security"
    },
    {
      title: "Dynamic Workforce Empowerment Engine",
      subtitle: "Cultivate talent and drive growth natively.",
      desc: "A company scales only as fast as its people learn. Eliminate third-party training platforms with our deeply integrated Learning Management System (LMS). From onboarding to continuous upskilling, create, deploy, and track custom courses within the exact same ecosystem your team uses to work every day.",
      icon: <Zap className="w-7 h-7" />,
      link: "/empowerment"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white font-sans overflow-hidden selection:bg-indigo-500/30 transition-colors duration-300 relative">
      
      {/* Subtle Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#e55d87]/15 to-[#5fc3e4]/15 dark:from-[#e55d87]/10 dark:to-[#5fc3e4]/10 transition-colors duration-300" />

      {/* Full-Page Sparkles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#818cf8"
        />
      </div>

      {/* Parallax Blobs */}
      <motion.div style={{ y: bgY1 }} className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 dark:bg-indigo-600/20 blur-[120px] pointer-events-none z-0" />
      <motion.div style={{ y: bgY2 }} className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 dark:bg-purple-600/10 blur-[150px] pointer-events-none z-0" />

      {/* Upgraded Scrolling Navigation Header */}
      <ScrollNavigationMenu />

      {/* Hero Section */}
      <section className="relative pt-48 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10 flex flex-col items-center justify-start pb-10">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 backdrop-blur-md text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            Intelligent Business Management System ✨
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-2 leading-tight text-slate-900 dark:text-white transition-colors duration-300"
          >
            Intelligent <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
              Workspaces.
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-[40rem] h-10 relative mt-2 mb-8 pointer-events-none"
          >
            <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-20 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-1/4" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto -mt-4 relative z-20 transition-colors duration-300"
          >
            The completely free, open-source SaaS architecture designed for high-performance teams and seamless generative AI integrations.
          </motion.p>
        </motion.div>
      </section>

      {/* The Parallax Scroll Reveal Container */}
      <section className="relative z-20 bg-transparent -mt-[-5rem] md:-mt-[7rem]">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                Unleash the power of <br />
                <span className="text-5xl md:text-[6rem] font-bold mt-2 leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
                  Total Control
                </span>
              </h1>
            </>
          }
        >
          <TabletDashboard />
        </ContainerScroll>
      </section>

      {/* Cinematic Built For Scale Section */}
      <section id="services" className="relative z-10 w-full overflow-hidden border-t border-gray-200 dark:border-white/5 bg-slate-50 dark:bg-[#0A0A0A] transition-colors duration-500">
        <WavyBackground 
          backgroundFill={mounted && resolvedTheme === "dark" ? "#0A0A0A" : "#f8fafc"}
          colors={["#6366f1", "#06b6d4", "#a855f7"]}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white transition-colors duration-300 tracking-tight drop-shadow-sm">
              Built for Scale
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-6 rounded-full shadow-lg" />
          </motion.div>
          
          <div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-[1200px]"
            onMouseLeave={() => setHoveredScaleCard(null)} 
          >
            {scaleCards.map((card, index) => {
              const isBlurred = hoveredScaleCard !== null && hoveredScaleCard !== index;
              return (
                <Link 
                  href={card.link} 
                  key={index} 
                  className="block h-full group outline-none"
                  onMouseEnter={() => setHoveredScaleCard(index)}
                >
                  <Interactive3DCard 
                    title={card.title} 
                    subtitle={card.subtitle}
                    desc={card.desc} 
                    icon={card.icon} 
                    delay={index * 0.1} 
                    isBlurred={isBlurred}
                  />
                </Link>
              );
            })}
          </div>
        </WavyBackground>
      </section>

      {/* 3D Parallax About Us Section */}
      <AboutUsSection />

      {/* 3D Parallax Animated Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 md:py-32 relative z-10 border-t border-gray-200 dark:border-white/5 bg-transparent transition-colors duration-300 overflow-hidden perspective-[1200px]">
        <ShaderBackground />
        <motion.div 
          style={{ y: testY, scale: testScale, opacity: testOpacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-slate-900 dark:text-white transition-colors duration-300 tracking-tight"
          >
            Trusted by the best
          </motion.h2>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </motion.div>
      </section>

      {/* Contact Us Section */}
      <ContactUsSection />

      {/* 3D Cinematic Ready To Scale CTA */}
      <ReadyToScaleCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Cinematic Interactive 3D Card
function Interactive3DCard({ title, subtitle, desc, icon, delay, isBlurred }: { title: string, subtitle: string, desc: string, icon: React.ReactNode, delay: number, isBlurred: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.15), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay }}
      style={{ perspective: 1200 }}
      className={`h-full transition-all duration-500 ease-out ${isBlurred ? "blur-[3px] opacity-40 scale-[0.97]" : "scale-100 opacity-100 blur-none"}`}
    >
      <motion.div
        ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full bg-white/60 dark:bg-[#111111]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-cyan-500/50 transition-colors duration-500 shadow-xl dark:shadow-2xl overflow-hidden cursor-pointer flex flex-col group"
      >
        <motion.div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background }} />
        <div style={{ transform: "translateZ(60px)" }} className="relative z-10 flex flex-col h-full pointer-events-none">
          <div className="w-14 h-14 mb-8 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-cyan-400 shadow-inner border border-indigo-100 dark:border-indigo-500/20">{icon}</div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900 dark:text-white transition-colors duration-300 leading-tight">{title}</h3>
          <p className="text-[15px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 mb-5 leading-snug">{subtitle}</p>
          <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-white/10 to-transparent mb-5" />
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed transition-colors duration-300 font-light flex-grow">{desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Cinematic "Ready to Scale" CTA Component with Success State
function ReadyToScaleCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const yOffset = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  // Interactive 3D Tilt State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="relative py-24 md:py-32 w-full flex items-center justify-center overflow-hidden perspective-[1500px]">
      
      {/* Ambient Outer Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 dark:bg-indigo-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 dark:bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        ref={ref}
        style={{ y: yOffset, scale, opacity, rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="relative z-10 w-full max-w-4xl mx-4 sm:mx-6 lg:mx-8"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-2xl shadow-2xl p-8 md:p-16 text-center flex flex-col items-center min-h-[400px] justify-center">
          
          {/* Inner Masked Sparkles for the Galaxy Box Effect */}
          <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50 dark:opacity-100">
            <SparklesCore id="cta-sparkles" background="transparent" minSize={0.5} maxSize={1.5} particleDensity={120} className="w-full h-full" particleColor="#06b6d4" />
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center"
              >
                <div style={{ transform: "translateZ(80px)" }} className="relative z-10 w-full flex flex-col items-center pointer-events-none">
                  <motion.div 
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white"
                  >
                    <Send className="w-8 h-8" />
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">scale?</span>
                  </h2>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 font-medium max-w-2xl mx-auto mb-10">
                    Join thousands of forward-thinking teams. Enter your email to get early access to the ultimate cognitive workspace.
                  </p>
                </div>

                {/* Email Form */}
                <div style={{ transform: "translateZ(100px)" }} className="relative z-20 w-full max-w-md mx-auto pointer-events-auto">
                  <form onSubmit={handleSubmit} className="relative flex items-center w-full group">
                    <input 
                      type="email" 
                      placeholder="Enter your work email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-full h-14 pl-6 pr-36 rounded-full bg-white/60 dark:bg-black/40 border border-gray-200 dark:border-white/10 shadow-inner backdrop-blur-md text-slate-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-80 disabled:hover:bg-indigo-600 min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>Sign Up <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-slate-500 dark:text-gray-500 mt-4 font-medium">No credit card required. Cancel anytime.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transform: "translateZ(100px)" }}
                className="relative z-20 flex flex-col items-center"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }} 
                  animate={{ scale: 1, rotate: 0 }} 
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                  Welcome aboard!
                </h3>
                <p className="text-lg text-slate-600 dark:text-gray-300 font-medium max-w-md mx-auto">
                  We've added <span className="text-indigo-500 dark:text-cyan-400 font-semibold">{email}</span> to our priority access list. Keep an eye on your inbox.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </section>
  );
}