"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../components/ui/resizable-navbar";
import { ThemeToggle } from "../../components/ui/theme-provider";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 1000], [0, -50]);

  const navItems = [
    { name: "Overview", link: "/dashboard" },
    { name: "AI Workspaces", link: "/dashboard/ai-tools" },
    { name: "Settings", link: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-white font-sans w-full relative overflow-x-hidden transition-colors duration-300">
      
      {/* Dotted Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/10 dark:bg-cyan-600/20 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
        </motion.div>
      </div>

      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium hidden lg:block">admin@meroidea.com</span>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(79,70,229,0.3)] dark:shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              S
            </div>
            <NavbarButton variant="secondary" onClick={() => router.push("/")}>
              Sign Out
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-white/5">
                {item.name}
              </a>
            ))}
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
            <NavbarButton onClick={() => router.push("/")} variant="secondary" className="w-full mt-4">
              Sign Out
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Dashboard Content - FIX: padding top increased to pt-32 to account for fixed navbar */}
      <motion.div style={{ y: contentY }} className="relative z-10 container mx-auto p-8 pt-32 max-w-7xl min-h-[150vh]">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2"
          >
            Welcome back, Sujan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Scroll down to see the Navbar resize and stick to the top!
          </motion.p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 perspective-[1200px]">
          <InteractiveDashboardCard title="Active Users" value="1,248" width="md:col-span-1" height="h-40" delay={0.1} />
          <InteractiveDashboardCard title="System Load (CPU)" value="24%" width="md:col-span-2" height="h-40" delay={0.2} highlight={true} />
          <InteractiveDashboardCard title="Active Errors" value="0" width="md:col-span-1" height="h-40" delay={0.3} />
          <InteractiveDashboardCard title="Recent AI Generations" value="8,492" width="md:col-span-3" height="h-96" delay={0.4} graphPlaceholder={true} />
          <InteractiveDashboardCard title="Quick Actions" value="Manage" width="md:col-span-1" height="h-96" delay={0.5} />
        </div>
      </motion.div>
    </div>
  );
}

// --- Internal 3D Widget Component ---

interface CardProps {
  title: string;
  value: string;
  width: string;
  height: string;
  delay: number;
  highlight?: boolean;
  graphPlaceholder?: boolean;
}

function InteractiveDashboardCard({ title, value, width, height, delay, highlight, graphPlaceholder }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${width} ${height}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative w-full h-full flex flex-col p-6 rounded-2xl border transition-colors cursor-default overflow-hidden group shadow-sm dark:shadow-none
          ${highlight 
            ? "bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-300 dark:hover:border-indigo-500/60" 
            : "bg-white dark:bg-[#111111]/80 backdrop-blur-sm border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20"
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full z-10">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 tracking-wide uppercase">{title}</h2>
          <span className={`text-3xl font-bold tracking-tight ${highlight ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"}`}>
            {value}
          </span>
          
          {graphPlaceholder && (
            <div className="flex-1 mt-6 rounded-lg border border-gray-200 dark:border-white/5 border-dashed flex items-center justify-center text-gray-500 dark:text-gray-600 bg-gray-50/50 dark:bg-black/20">
              [ Data Visualization Rendering... ]
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}