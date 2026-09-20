// components/slide.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxText({ children, baseVelocity = 5, className, style }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollerWidth, setScrollerWidth] = useState(0);

  useEffect(() => {
  const updateWidth = () => {
    if (scrollerRef.current) {
      // Use direct DOM measurement instead of divided width
      const firstChild = scrollerRef.current.children[0] as HTMLElement;
      setScrollerWidth(firstChild.offsetWidth * 4); // 8 items = 2 full loops
    }
  };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [children]);

  const x = useTransform(baseX, (v) => 
    scrollerWidth ? `${wrap(-scrollerWidth, 0, v)}px` : "0px"
  );

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={`w-full overflow-hidden absolute ${className}`}
      style={style}
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ 
          x,
          willChange: "transform", // Pre-allocate GPU resources
          transform: "translateZ(0) scale(1)", // Force GPU layer
          backfaceVisibility: "hidden",
          filter: "none!important" // Avoid filter conflicts in CEF
        }}
        ref={scrollerRef}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="inline-block px-8">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}