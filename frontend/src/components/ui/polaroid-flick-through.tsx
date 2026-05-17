"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Seeded pseudo-random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

export interface ImageData {
  src: string;
  alt: string;
  id: string;
}

interface ScatterPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface ImageStackProps {
  images: ImageData[];
  maxRotation?: number;
  scatterRadius?: number;
  seed?: number;
  className?: string;
  onReshuffle?: () => void;
}

export interface ImageStackRef {
  reshuffle: () => void;
}

// Framer Motion variants for container and cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2, // Slight delay so the left side text animations start first
      staggerChildren: 1.5,
    },
  },
};

const cardVariants = {
  hidden: (custom: { zIndex: number }) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0.8,
    opacity: 0,
    zIndex: custom.zIndex,
  }),
  visible: (custom: {
    position: ScatterPosition;
    zIndex: number;
    springConfig: any;
  }) => ({
    x: custom.position.x,
    y: custom.position.y,
    rotate: custom.position.rotation,
    scale: custom.position.scale,
    opacity: 1,
    zIndex: custom.zIndex,
    transition: {
       opacity: { duration: 0.5 },
       ...custom.springConfig
    },
  }),
};

export const ImageStack = React.forwardRef<ImageStackRef, ImageStackProps>(
  (
    {
      images,
      maxRotation = 15,
      scatterRadius = 30, // Tighter scatter for split-screen layouts
      seed = 12345,
      className = "",
      onReshuffle,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [imagesLoaded, setImagesLoaded] = React.useState(false);
    const [scatterPositions, setScatterPositions] = React.useState<ScatterPosition[]>([]);
    const [currentSeed, setCurrentSeed] = React.useState(seed);
    const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set());

    const containerRef = React.useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Generate scatter positions centered in the layout
    const generateScatterPositions = React.useCallback(
      (seedValue: number) => {
        const rng = new SeededRandom(seedValue);
        return images.map(() => ({
          x: rng.range(-scatterRadius, scatterRadius), // Centered scatter, not offset
          y: rng.range(-scatterRadius, scatterRadius),
          rotation: rng.range(-maxRotation, maxRotation),
          scale: rng.range(0.95, 1.05),
        }));
      },
      [images, scatterRadius, maxRotation]
    );

    // Preload images
    React.useEffect(() => {
      const preloadImages = async () => {
        const loadPromises = images.map((image) => {
          return new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              setLoadedImages((prev) => new Set(prev).add(image.id));
              resolve(image.id);
            };
            img.onerror = () => {
              console.warn(`Failed to load image: ${image.id}`);
              reject(new Error(`Failed to load image: ${image.id}`));
            };
            img.src = image.src;
          });
        });

        try {
          await Promise.all(loadPromises);
          setImagesLoaded(true);
        } catch (error) {
          console.error("Error preloading images:", error);
          setImagesLoaded(true); // Continue anyway
        }
      };

      preloadImages();
    }, [images]);

    // Generate initial positions
    React.useEffect(() => {
      setScatterPositions(generateScatterPositions(currentSeed));
    }, [currentSeed, generateScatterPositions]);

    // Intersection observer
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && imagesLoaded) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [imagesLoaded]);

    // Reshuffle function
    const reshuffle = React.useCallback(() => {
      const newSeed = Math.floor(Math.random() * 1000000);
      setCurrentSeed(newSeed);
      setIsVisible(false);

      setTimeout(() => {
        setIsVisible(true);
      }, 100);

      onReshuffle?.();
    }, [onReshuffle]);

    React.useImperativeHandle(ref, () => ({ reshuffle }), [reshuffle]);

    const springConfig = prefersReducedMotion
      ? { type: "tween", duration: 0.3 }
      : { type: "spring", stiffness: 100, damping: 20 };

    return (
      <div className={`relative w-full h-[500px] flex items-center justify-center overflow-visible ${className}`}>
        <motion.div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500 animate-pulse">Loading intelligence...</div>
            </div>
          )}

          {images.map((image, index) => {
            const position = scatterPositions[index];
            if (!position) return null;

            return (
              <motion.div
                key={`${image.id}-${currentSeed}`}
                className="absolute shadow-2xl"
                variants={cardVariants}
                custom={{
                  position: position,
                  zIndex: images.length - index,
                  springConfig: springConfig,
                }}
                style={{
                  transformOrigin: "center center"
                }}
              >
                <div className="bg-white p-4 shadow-xl border border-gray-200 rounded-sm hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-64 h-80 sm:w-72 sm:h-96 object-cover rounded-sm"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='384'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280'%3EImage not found%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="mt-3 text-sm text-gray-600 text-center font-medium font-sans uppercase tracking-widest">
                    {image.alt}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  }
);
ImageStack.displayName = "ImageStack";