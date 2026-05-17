"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { ArrowLeft, Key, Mail, Shield, User, Zap } from "lucide-react";
import Link from "next/link";

export function AuthSwitch() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md relative z-10">
      
     

      {/* Main Authentication Interface Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl dark:shadow-[0_0_50px_rgba(99,102,241,0.1)] relative overflow-hidden"
      >
        {/* Glow Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin ? "Access your high-performance workspace" : "Get started with your free tier SaaS architecture"}
          </p>
        </div>

        {/* Tab Switcher Headers */}
        <div className="grid grid-cols-2 bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-1 rounded-xl mb-6 relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsLogin(true)}
            className={`rounded-lg transition-all text-xs font-semibold ${isLogin ? "bg-white dark:bg-[#222] shadow-sm text-indigo-600 dark:text-white" : "text-gray-500 hover:text-slate-800 dark:hover:text-white"}`}
          >
            Sign In
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsLogin(false)}
            className={`rounded-lg transition-all text-xs font-semibold ${!isLogin ? "bg-white dark:bg-[#222] shadow-sm text-indigo-600 dark:text-white" : "text-gray-500 hover:text-slate-800 dark:hover:text-white"}`}
          >
            Register
          </Button>
        </div>

        {/* Input Forms Animation Container */}
        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? -15 : 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 15 : -15 }}
            transition={{ duration: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            {!isLogin && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input id="name" type="text" placeholder="Sujan Darji" className="pl-9 bg-transparent border-gray-200 dark:border-white/10" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input id="email" type="email" placeholder="sujan@meroidea.com" className="pl-9 bg-transparent border-gray-200 dark:border-white/10" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link href="#" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-9 bg-transparent border-gray-200 dark:border-white/10" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 py-2.5 rounded-xl font-medium mt-2 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              {isLogin ? "Sign In to Workspace" : "Provision New Workspace"}
            </Button>
          </motion.form>
        </AnimatePresence>

        {/* Divider Node */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-white/10" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#111] px-2 text-gray-400">Or connect via</span></div>
        </div>

        {/* FIXED GOOGLE & GITHUB OAUTH TRIGGERS (Removed Duplicate Fills) */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl flex items-center justify-center gap-2 text-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>
          <Button variant="outline" className="border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl flex items-center justify-center gap-2 text-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub
          </Button>
        </div>

        {/* Security Disclosures */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400">
          <Shield className="w-3 h-3 text-indigo-500/50" />
          <span>AES-256 Encrypted Session Safeguard Secure Link</span>
        </div>

      </motion.div>
    </div>
  );
}