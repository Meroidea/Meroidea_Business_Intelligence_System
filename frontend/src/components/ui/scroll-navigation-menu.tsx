"use client"

import * as React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion"
import { Menu, X, Home, Layers, Code, Briefcase, ChevronDown, User, Info, Mail } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-provider"

interface SubMenuItem {
  id: number
  title: string
  url: string
  description: string
  icon: React.ReactNode
}

interface MenuItem {
  id: number
  title: string
  url: string
  icon: React.ReactNode
  children?: SubMenuItem[]
}

interface ScrollNavbarProps {
  className?: string
}

// --- LOGO ANIMATION VARIANTS ---
const logoContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const letterVariants: Variants = {
  hidden: { y: 15, opacity: 0, filter: "blur(4px)" },
  visible: { 
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 250, damping: 15 } 
  },
};

// --- MENU ANIMATION VARIANTS ---
const menuVariants: Variants = {
  closed: {
    opacity: 0, scale: 0.8, y: -50,
    transition: { type: "spring", stiffness: 300, damping: 30, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 }
  },
  open: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  closed: { y: 20, opacity: 0, scale: 0.8 },
  open: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } }
}

export const ScrollNavigationMenu: React.FC<ScrollNavbarProps> = ({ className = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Desktop Hover States
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [hoveredDropdown, setHoveredDropdown] = useState<number | null>(null)
  
  // Mobile Accordion State
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)
  
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100)
  })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Dynamic Navigation Setup with Dropdowns & Anchors
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "HOME",
      url: "/",
      icon: <Home className="w-4 h-4" />
    },
    {
      id: 2,
      title: "RESOURCES",
      url: "#",
      icon: <Layers className="w-4 h-4" />,
      children: [
        {
          id: 21,
          title: "For Developers",
          url: pathname === "/" ? "#developers" : "/#developers",
          description: "API references, SDKs, and integrations.",
          icon: <Code className="w-5 h-5 text-indigo-500" />
        },
        {
          id: 22,
          title: "For Business",
          url: pathname === "/" ? "#business" : "/#business",
          description: "Enterprise workflows and analytics.",
          icon: <Briefcase className="w-5 h-5 text-cyan-500" />
        }
      ]
    },
    {
      id: 3,
      title: "ABOUT US",
      url: pathname === "/" ? "#about" : "/#about",
      icon: <Info className="w-4 h-4" />
    },
    {
      id: 4,
      title: "CONTACT US",
      url: pathname === "/" ? "#contact" : "/#contact",
      icon: <Mail className="w-4 h-4" />
    }
  ]

  return (
    <>
      {/* Full Header Navbar Layer */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isScrolled ? -100 : 0,
          opacity: isScrolled ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-[#0A0A0A]/60 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 transition-colors duration-300 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* BRANDING: Cinematic Animated Logo */}
            <motion.div
              className="flex-shrink-0"
              initial="hidden"
              animate="visible"
              variants={logoContainerVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/" className="flex items-center text-2xl font-black tracking-tighter relative overflow-hidden group py-1 pr-4">
                <div className="flex">
                  {"MERO".split("").map((char, i) => (
                    <motion.span key={`mero-${i}`} variants={letterVariants} className="text-indigo-600 dark:text-indigo-400 drop-shadow-sm">
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="flex">
                  {"IDEA".split("").map((char, i) => (
                    <motion.span key={`idea-${i}`} variants={letterVariants} className="text-cyan-500 dark:text-cyan-400">
                      {char}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent -skew-x-12 pointer-events-none"
                  initial={{ x: "-150%" }} animate={{ x: "150%" }} transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 5, ease: "easeInOut" }}
                />
              </Link>
            </motion.div>

            {/* DESKTOP MENU HUB */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredItem(item.id);
                      if (item.children) setHoveredDropdown(item.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      setHoveredDropdown(null);
                    }}
                  >
                    {/* Main Tab Trigger */}
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-bold tracking-wide text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors z-10 relative group"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      {item.children && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredDropdown === item.id ? "rotate-180 text-indigo-500" : ""}`} />
                      )}
                    </Link>
                    
                    {/* Gliding Hover Pill Background */}
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <motion.div
                          layoutId="navbar-hover"
                          className="absolute inset-0 bg-slate-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-lg -z-0 shadow-sm"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Animated Glass Dropdown */}
                    <AnimatePresence>
                      {item.children && hoveredDropdown === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -10 }}
                          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95, rotateX: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 origin-top"
                        >
                          <div className="flex flex-col gap-1">
                            {item.children.map((child) => (
                              <Link 
                                key={child.id} 
                                href={child.url}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                              >
                                <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-white/10 transition-all shadow-sm">
                                  {child.icon}
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {child.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                                    {child.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                ))}
              </div>
            </div>

            {/* Actions Segment */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              
              {/* REDESIGNED CREATIVE LOGIN BUTTON (Icon Only) */}
              <Link href="/login" className="hidden sm:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl font-bold overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] border border-gray-200 dark:border-white/10 cursor-pointer"
                >
                  {/* Default Background */}
                  <div className="absolute inset-0 bg-slate-900 dark:bg-white transition-colors duration-300" />
                  
                  {/* Animated Sweeping Hover Gradient Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Content Element (Icon) */}
                  <span className="relative flex items-center justify-center text-white dark:text-slate-900 group-hover:text-white transition-colors duration-300 z-10">
                    <User className="w-5 h-5" />
                  </span>
                </motion.div>
              </Link>
              
              <div className="lg:hidden">
                <motion.button onClick={toggleMenu} className="p-2 text-slate-800 dark:text-white focus:outline-none" whileTap={{ scale: 0.9 }}>
                  <Menu className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Floating Hamburger Circular Trigger (Visible when Scrolled Down) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-6 right-6 z-50 flex items-center gap-3"
      >
        <AnimatePresence>
          {isScrolled && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-md p-1.5 rounded-full border border-gray-200 dark:border-white/10 shadow-lg">
              <ThemeToggle />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={toggleMenu}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-[0_4px_20px_rgba(79,70,229,0.4)] flex items-center justify-center border border-indigo-500/20"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </motion.div>

      {/* Mobile Drawer Menu Overlays */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-40" onClick={toggleMenu} />
            <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
              <div className="relative bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  <ThemeToggle />
                  <span className="text-xs text-gray-400 font-medium">Switch Appearance</span>
                </div>

                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-2 text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white rounded-full"
                  whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <div className="space-y-2 mt-10 max-h-[60vh] overflow-y-auto no-scrollbar pb-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      {item.children ? (
                        // Accordion Trigger for Mobile
                        <motion.button
                          variants={itemVariants}
                          onClick={() => setExpandedMobile(expandedMobile === item.id ? null : item.id)}
                          className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group w-full text-left"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-indigo-600 dark:text-indigo-400">{item.icon}</div>
                            <span className="text-base font-bold tracking-wider text-slate-900 dark:text-white">{item.title}</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedMobile === item.id ? "rotate-180 text-indigo-500" : ""}`} />
                        </motion.button>
                      ) : (
                        // Standard Link for Mobile
                        <motion.div variants={itemVariants} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            href={item.url}
                            onClick={toggleMenu}
                            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-gray-100 dark:hover:border-white/5"
                          >
                            <div className="text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-200">{item.icon}</div>
                            <span className="text-base font-bold tracking-wider text-slate-900 dark:text-white">{item.title}</span>
                          </Link>
                        </motion.div>
                      )}

                      {/* Mobile Accordion Children */}
                      <AnimatePresence>
                        {item.children && expandedMobile === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-12 border-l-2 border-indigo-100 dark:border-white/10 pl-2 mt-2"
                          >
                            <div className="flex flex-col gap-2 py-2">
                              {item.children.map((child) => (
                                <Link 
                                  key={child.id} 
                                  href={child.url}
                                  onClick={toggleMenu}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                >
                                  {child.icon}
                                  <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">{child.title}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Mobile Login Button */}
                  <motion.div variants={itemVariants} className="pt-4 border-t border-gray-100 dark:border-white/10 mt-4">
                     <Link href="/login" onClick={toggleMenu} className="w-full flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full relative flex items-center justify-center bg-slate-900 dark:bg-white hover:bg-indigo-600 text-white dark:text-slate-900 dark:hover:text-white rounded-xl py-4 font-bold shadow-lg overflow-hidden group transition-colors duration-500"
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                          <span className="relative z-10 flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            Access Workspace
                          </span>
                        </motion.div>
                     </Link>
                  </motion.div>
                </div>

                <motion.div className="absolute -top-1 -left-1 w-3 h-3 bg-indigo-500 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}