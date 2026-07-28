"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, PenTool, Code, Cpu, Orbit } from "lucide-react";

interface StoryCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  delay: number;
}

function StoryCard({ title, icon, content, delay }: StoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative group glass p-6 md:p-8 rounded-3xl overflow-hidden min-h-[260px] flex flex-col justify-between"
    >
      {/* Dynamic Cursor Light Spot effect (Vercel-like hover glow) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 -z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(0, 245, 255, 0.05), transparent 70%)`,
        }}
      />
      {/* Dynamic Border Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(0, 82, 255, 0.25), transparent 80%)`,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="flex flex-col gap-4">
        {/* Icon container */}
        <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-accent-cyan group-hover:text-white transition-colors duration-500">
          {icon}
        </div>

        <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mt-1">
          {title}
        </h3>
        
        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-normal">
          {content}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between text-[9px] uppercase font-bold tracking-[0.2em] text-neutral-600 group-hover:text-accent-cyan transition-colors duration-300">
        <span>Story Chapter</span>
        <span>// 0{delay * 5 + 1}</span>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const STORIES = [
    {
      title: "Who I Am",
      icon: <User className="w-5 h-5" />,
      content: "I am Swarnavo Biswas, a creative frontend engineer obsessed with crafting premium, interactive digital interfaces. Bridging code and logic with visual design, I construct web platforms that prioritize layout hierarchy, typography, and purposeful micro-interactions.",
      delay: 0.05,
    },
    {
      title: "My Design Philosophy",
      icon: <PenTool className="w-5 h-5" />,
      content: "Elegant simplicity is my North Star. I draw deep inspiration from modern minimalism—championed by the likes of Apple, Linear, and Vercel. I believe that every element must serve a structural purpose, and motion should guide the user journey rather than distract.",
      delay: 0.1,
    },
    {
      title: "Why I Love Frontend",
      icon: <Code className="w-5 h-5" />,
      content: "Frontend development is where static designs breathe life. The thrill of transforming code files into fluid, responsive, 60fps animations is what keeps me coding. I thrive at the intersection of aesthetic beauty and performance engineering.",
      delay: 0.15,
    },
    {
      title: "Exploring Web3",
      icon: <Cpu className="w-5 h-5" />,
      content: "I am active in the Web3 sandbox, exploring decentralization pipelines, blockchain networks, and smart contract frontends. Connecting wallets and building seamless interface layers for dApps represent the future of digital ownership.",
      delay: 0.2,
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="mb-20 flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <Orbit className="w-4 h-4 text-accent-purple animate-spin-slow" />
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent-purple">
            NARRATIVE
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
          Storytelling <span className="text-gradient">// About Me</span>
        </h2>
        <p className="text-neutral-500 text-sm max-w-lg leading-relaxed mt-2">
          Discarding generic bios and statistics. Here is the blueprint of my creative journey and what drives my code.
        </p>
      </div>

      {/* Asymmetric Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Sticky Portrait Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            className="group relative glass p-4 rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col gap-4 select-none"
          >
            {/* Soft background red glow backing your portrait */}
            <div className="absolute inset-0 bg-red-600/5 blur-[50px] rounded-full scale-75 pointer-events-none z-0" />
            
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden z-10 border border-white/5">
              <Image
                src="/profile.jpg"
                alt="Swarnavo Biswas Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                priority
              />
            </div>
            
            <div className="flex flex-col gap-1 z-10 px-2 py-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold tracking-tight text-white uppercase">
                  Swarnavo Biswas
                </h3>
                <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-widest animate-pulse">
                  // Portrait
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                Frontend Developer & Web3 Explorer
              </span>
            </div>
          </motion.div>
        </div>

        {/* Storytelling Cards Column */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STORIES.map((story, index) => (
            <StoryCard
              key={index}
              title={story.title}
              icon={story.icon}
              content={story.content}
              delay={story.delay}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
