"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  range?: number; // Distance in pixels that initiates the pull
  strength?: number; // Magnetism pull multiplier
}

export default function MagneticButton({ 
  children, 
  className = "", 
  range = 60,
  strength = 0.35
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Target motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring damping for fluid, organic motion
  const springConfig = { damping: 15, stiffness: 120, mass: 0.6 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    
    // Find center of button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distances
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < range) {
      setIsHovered(true);
      // Pull button towards cursor relative to distance and strength multiplier
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      if (isHovered) {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={`inline-block relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
