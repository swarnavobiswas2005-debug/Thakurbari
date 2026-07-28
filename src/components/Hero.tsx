"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Code, Sparkles, ArrowUpRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

const ROLES = [
  "Frontend Developer",
  "Web Designer",
  "Web3 Explorer",
  "Creative Developer"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 1. Cycle subtitles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Local mouse tracking for parallax decoration offset
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40, // max 20px displacement
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Split title characters for staggered clip reveal
  const titleText = "Swarnavo Biswas";

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden py-20 px-4 md:px-8 border-b border-neutral-900/30"
    >
      {/* Subtle background blueprint grid shifting slightly with mouse parallax */}
      <motion.div
        className="absolute inset-0 grid-lines opacity-[0.15] pointer-events-none -z-10"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      />

      {/* Grid spotlight overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/60 to-background pointer-events-none -z-10" />

      {/* Decorative blurred auroras */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{
          x: mousePosition.x * -0.7,
          y: mousePosition.y * -0.7,
        }}
      />
      <motion.div
        className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{
          x: mousePosition.x * 0.7,
          y: mousePosition.y * 0.7,
        }}
      />

      {/* Hero Content Container */}
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center z-10">
        
        {/* Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border-white/5 mb-8 hover:border-white/10 transition-colors cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400">
            Portfolio v2.0 • Premium Cinematic
          </span>
        </motion.div>

        {/* Title Heading: Staggered clip-path characters reveal */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase select-none leading-none mb-6">
          {titleText.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-3 md:mr-6">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + (wordIdx * 5 + charIdx) * 0.03,
                    ease: [0.215, 0.610, 0.355, 1.0], // cubic-out
                  }}
                  className="inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Dynamic Vertical Sliding Subtitle Carousel */}
        <div className="h-10 overflow-hidden flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-lg md:text-2xl font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple bg-clip-text text-transparent flex items-center gap-2"
            >
              <Code className="w-5 h-5 text-accent-cyan" />
              {ROLES[roleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-neutral-400 text-sm md:text-lg max-w-2xl leading-relaxed mb-12"
        >
          Building modern web experiences with beautiful interfaces, thoughtful interactions, and a passion for Web3 technologies.
        </motion.p>

        {/* Action Buttons with Magnetic Effects */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full sm:w-auto"
        >
          {/* CTA: Explore Work */}
          <MagneticButton strength={0.25} range={50}>
            <a
              href="#projects"
              className="group relative flex items-center justify-center gap-2 px-8 h-14 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5 overflow-hidden"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </MagneticButton>

          {/* Contact Direct Button */}
          <MagneticButton strength={0.25} range={50}>
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 px-8 h-14 bg-transparent border border-white/10 text-white hover:border-white/30 transition-all font-semibold rounded-full backdrop-blur-sm"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 select-none group"
        onClick={() => {
          const el = document.querySelector("#about");
          if (el && (window as any).lenisInstance) {
            (window as any).lenisInstance.scrollTo(el, { offset: -80, duration: 1.5 });
          }
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold group-hover:text-white transition-colors duration-300">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-neutral-800 group-hover:border-white/30 transition-colors duration-300 flex items-center justify-center text-neutral-400 group-hover:text-white"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
