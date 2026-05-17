"use client";

import React, { useRef, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Context to share the container ref with child draggable bodies
const DraggableContext = createContext<React.RefObject<HTMLDivElement> | null>(null);

export const DraggableCardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <DraggableContext.Provider value={containerRef}>
      <div ref={containerRef} className={cn("relative overflow-hidden w-full h-full", className)}>
        {children}
      </div>
    </DraggableContext.Provider>
  );
};

export const DraggableCardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useContext(DraggableContext);
  
  if (!containerRef) {
    throw new Error("DraggableCardBody must be used within a DraggableCardContainer");
  }

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      dragMomentum={true}
      whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 100 }}
      whileHover={{ cursor: "grab" }}
      className={cn("absolute cursor-grab active:cursor-grabbing", className)}
    >
      {children}
    </motion.div>
  );
};