"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Milestone, Flag, Layers, Compass, Code, GraduationCap } from "lucide-react";

interface JourneyItem {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const JOURNEY_STEPS: JourneyItem[] = [
  {
    title: "Started Learning Web Development",
    subtitle: "The Foundation",
    description: "Began by mastering the absolute pillars: semantic HTML5 structures, vanilla CSS grids, layouts, and DOM manipulation via pure Javascript. Built simple games and scripts to understand logical state.",
    icon: <GraduationCap className="w-5 h-5" />,
    tags: ["HTML", "CSS", "JavaScript", "DOM API"],
  },
  {
    title: "Building Responsive Websites",
    subtitle: "Layout Engineering",
    description: "Shifted focus to mobile-first designs, layout structures, and cross-browser fluidity. Learned utility-first frameworks like Tailwind and custom responsive media rules to support all viewports.",
    icon: <Layers className="w-5 h-5" />,
    tags: ["Tailwind CSS", "Flexbox", "CSS Grid", "Responsive Design"],
  },
  {
    title: "Creating Interactive Interfaces",
    subtitle: "Interactive Storytelling",
    description: "Discovered the impact of motion physics. Dived deep into custom animation libraries like Framer Motion, GSAP, and WebGL basics to translate static interfaces into interactive, alive user flows.",
    icon: <Code className="w-5 h-5" />,
    tags: ["GSAP", "Framer Motion", "Micro-interactions", "Canvas"],
  },
  {
    title: "Learning Modern Frameworks",
    subtitle: "Component-Driven Architecture",
    description: "Adopted React and Next.js to compile state-driven components, client/server boundaries, and file-system based routing architectures. Optimized rendering, speed indices, and build pipelines.",
    icon: <Layers className="w-5 h-5" />,
    tags: ["React", "TypeScript", "Next.js", "App Router"],
  },
  {
    title: "Exploring Web3 sandbox",
    subtitle: "Decentralized Networks",
    description: "Expanded horizons into block architectures and EVM chains. Exploring Solidity, smart contracts, smart logic connections, wallets, and standard front-end dApp bindings like Ethers.js.",
    icon: <Compass className="w-5 h-5" />,
    tags: ["Solidity", "Web3.js", "Ethers.js", "dApps"],
  },
  {
    title: "Building Better Experiences",
    subtitle: "Cinematic Web & Engineering",
    description: "Refining the intersection of high-fidelity WebGL graphics, flawless performance, and modern layout stories to create award-winning web applications for global audiences.",
    icon: <Flag className="w-5 h-5" />,
    tags: ["Three.js", "Creative Dev", "Performance Optimization", "SEO"],
  },
];

function JourneyCard({ item, index }: { item: JourneyItem; index: number }) {
  // Alternating card layout offsets on larger screens, left-aligned on mobile
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-16 md:mb-24 last:mb-0">
      
      {/* 1. Left side item spacer / content */}
      <div className={`w-full md:w-[45%] flex ${isEven ? "md:justify-end" : "md:justify-start order-last"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
          className="w-full glass p-6 md:p-8 rounded-3xl relative hover:border-white/10 transition-colors group shadow-lg"
        >
          {/* Card Indicator Glow */}
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-accent-blue opacity-50 group-hover:scale-150 group-hover:bg-accent-cyan transition-all duration-300" />
          
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent-cyan uppercase mb-2 block">
            {item.subtitle}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white mb-3">
            {item.title}
          </h3>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 2. Middle Node Anchor indicator */}
      <div className="absolute left-4 md:left-1/2 top-6 md:top-auto -translate-x-[9px] md:-translate-x-1/2 z-10 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-[18px] h-[18px] rounded-full bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center hover:border-accent-cyan transition-colors group cursor-default"
        >
          {/* Internal core glow dot */}
          <div className="w-[6px] h-[6px] rounded-full bg-accent-cyan opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
        </motion.div>
      </div>

      {/* 3. Right side spacer to balance the flex items on desktop */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Hook into scroll mapping for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start drawing the line when top of section is 80% from top of screen, 
    // finish drawing when bottom of section is 50% from top of screen
    offset: ["start 70%", "end 60%"],
  });

  const scaleYSpring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Section Title */}
      <div className="mb-24 flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2">
          <Milestone className="w-4 h-4 text-accent-cyan animate-bounce" />
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent-cyan">
            ROADMAP
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
          Development <span className="text-gradient">// Journey</span>
        </h2>
        <p className="text-neutral-500 text-sm max-w-lg leading-relaxed mt-2">
          A visual chronicle tracking the expansion of my technical skills, design standards, and blockchain insights.
        </p>
      </div>

      {/* Timeline Elements wrapper */}
      <div className="relative mt-16 md:mt-24 pl-8 md:pl-0">
        
        {/* Static Background track line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-900 -translate-x-[0.5px] md:-translate-x-1/2" />

        {/* Dynamic Animated Scroll-Drawing active line */}
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-purple origin-top -translate-x-[1px] md:-translate-x-1/2 shadow-[0_0_15px_rgba(0,245,255,0.5)]"
          style={{
            scaleY: scaleYSpring,
            height: "100%",
          }}
        />

        {/* Timeline steps mapping */}
        <div className="flex flex-col">
          {JOURNEY_STEPS.map((step, idx) => (
            <JourneyCard key={idx} item={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
