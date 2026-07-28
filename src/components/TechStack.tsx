"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Code2, Cpu, Database, Figma, GitBranch, 
  Globe, Laptop, Layers, ShieldCheck, Wallet, Wind 
} from "lucide-react";

interface TechItem {
  name: string;
  category: "languages" | "frameworks" | "libraries" | "tools" | "web3";
  icon: React.ReactNode;
  description: string;
  glowColor: string;
}

const TECH_ITEMS: TechItem[] = [
  // Languages
  {
    name: "HTML",
    category: "languages",
    icon: <Globe className="w-5 h-5" />,
    description: "Structuring web content with semantic elements to optimize accessibility and SEO indexing.",
    glowColor: "rgba(241, 101, 41, 0.2)",
  },
  {
    name: "CSS",
    category: "languages",
    icon: <Wind className="w-5 h-5" />,
    description: "Writing performant stylesheet architectures using custom media rules, CSS variables, and layout models.",
    glowColor: "rgba(38, 77, 228, 0.2)",
  },
  {
    name: "JavaScript",
    category: "languages",
    icon: <Code2 className="w-5 h-5" />,
    description: "Crafting lightweight, reactive clients with modern ES6+ paradigms, event loops, and asynchronous calls.",
    glowColor: "rgba(247, 223, 30, 0.15)",
  },
  {
    name: "TypeScript",
    category: "languages",
    icon: <ShieldCheck className="w-5 h-5" />,
    description: "Implementing strict static type systems, interface structures, and generic parameters to eliminate runtime errors.",
    glowColor: "rgba(49, 120, 198, 0.2)",
  },

  // Frameworks
  {
    name: "React",
    category: "frameworks",
    icon: <Layers className="w-5 h-5" />,
    description: "Architecting component libraries utilizing hooks, state models, and reconciliation triggers.",
    glowColor: "rgba(97, 218, 251, 0.2)",
  },
  {
    name: "Next.js",
    category: "frameworks",
    icon: <Laptop className="w-5 h-5" />,
    description: "Leveraging App Router structures, SSR/ISR paradigms, client/server routing boundaries, and optimization utilities.",
    glowColor: "rgba(255, 255, 255, 0.15)",
  },

  // Libraries
  {
    name: "Tailwind CSS",
    category: "libraries",
    icon: <Wind className="w-5 h-5" />,
    description: "Designing layout patterns with utility-first rules, custom theme extensions, and inline variants.",
    glowColor: "rgba(56, 189, 248, 0.2)",
  },
  {
    name: "Framer Motion",
    category: "libraries",
    icon: <Cpu className="w-5 h-5" />,
    description: "Orchestrating layout changes, micro-interactions, spring physics, and viewport triggers.",
    glowColor: "rgba(255, 0, 127, 0.2)",
  },
  {
    name: "GSAP",
    category: "libraries",
    icon: <Terminal className="w-5 h-5" />,
    description: "Building precise scroll timelines, stagger grids, SVG path animations, and custom ticker handlers.",
    glowColor: "rgba(136, 204, 0, 0.2)",
  },
  {
    name: "Three.js",
    category: "libraries",
    icon: <Globe className="w-5 h-5" />,
    description: "Constructing WebGL layouts using canvas meshes, custom shaders, lights, particles, and texture overlays.",
    glowColor: "rgba(0, 245, 255, 0.2)",
  },

  // Tools
  {
    name: "Node.js",
    category: "tools",
    icon: <Database className="w-5 h-5" />,
    description: "Configuring server runtimes, packaging routines, environment settings, and local script automations.",
    glowColor: "rgba(131, 205, 41, 0.15)",
  },
  {
    name: "Git",
    category: "tools",
    icon: <GitBranch className="w-5 h-5" />,
    description: "Tracking local codebase variations, managing branches, diff logs, and merging logic pipelines.",
    glowColor: "rgba(240, 80, 51, 0.2)",
  },
  {
    name: "GitHub",
    category: "tools",
    icon: <Code2 className="w-5 h-5" />,
    description: "Hosting repositories, reviewing code integrations, and maintaining version history streams.",
    glowColor: "rgba(255, 255, 255, 0.15)",
  },
  {
    name: "Figma",
    category: "tools",
    icon: <Figma className="w-5 h-5" />,
    description: "Inspecting vector designs, layout tokens, gradients, and font properties to build pixel-perfect styles.",
    glowColor: "rgba(242, 78, 29, 0.2)",
  },

  // Web3
  {
    name: "Solidity",
    category: "web3",
    icon: <Cpu className="w-5 h-5" />,
    description: "Writing EVM smart contracts, enforcing access control rules, optimizing gas consumption, and running tests.",
    glowColor: "rgba(98, 126, 234, 0.2)",
  },
  {
    name: "Web3.js",
    category: "web3",
    icon: <Wallet className="w-5 h-5" />,
    description: "Integrating blockchain networks into client pages to query blocks, connect nodes, and watch transaction outputs.",
    glowColor: "rgba(241, 104, 34, 0.2)",
  },
  {
    name: "Ethers.js",
    category: "web3",
    icon: <Wallet className="w-5 h-5" />,
    description: "Instantiating provider/signer contracts to securely sign blocks, transfer assets, and read smart contract events.",
    glowColor: "rgba(37, 99, 235, 0.2)",
  },
];

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { label: "All Tech", value: "all" },
    { label: "Languages", value: "languages" },
    { label: "Frameworks & UI", value: "frameworks" },
    { label: "Motion & Graphics", value: "libraries" },
    { label: "Web3 Sandbox", value: "web3" },
    { label: "Workflow Tools", value: "tools" },
  ];

  const filteredTech = activeCategory === "all"
    ? TECH_ITEMS
    : TECH_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="tech" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto border-t border-neutral-900/30">
      
      {/* Decorative Blur */}
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-accent-cyan animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent-cyan">
              CAPABILITIES
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-md leading-relaxed mt-2">
            An interactive layout of languages, frameworks, blockchain bindings, and styling suites. Hover to reveal implementation roles.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:max-w-xl justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTech.map((tech, idx) => {
          // Semi-random floating animation offsets to keep movement organic
          const animationDelay = (idx * 0.1) % 0.5;

          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
              whileHover={{ 
                y: -6, 
                borderColor: tech.glowColor.replace("0.2", "0.5").replace("0.15", "0.4")
              }}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
              className="glass p-5 rounded-2xl flex items-center gap-4 transition-colors duration-300 cursor-default relative overflow-hidden select-none border border-white/5"
              style={{
                boxShadow: hoveredTech?.name === tech.name ? `0 10px 30px -10px ${tech.glowColor}` : "none",
              }}
            >
              {/* Dynamic light reflection line in background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${tech.glowColor} 0%, transparent 100%)`
                }}
              />

              <div 
                className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors duration-300"
                style={{
                  color: hoveredTech?.name === tech.name ? "#ffffff" : "#a3a3a3",
                  borderColor: hoveredTech?.name === tech.name ? tech.glowColor : "rgba(255, 255, 255, 0.05)"
                }}
              >
                {tech.icon}
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wide">
                  {tech.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-600">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Shared Description Deck (displays detail of hovered tech) */}
      <div className="mt-10 h-28 relative">
        <AnimatePresence mode="wait">
          {hoveredTech ? (
            <motion.div
              key={hoveredTech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass p-6 rounded-2xl border border-white/10 flex items-start gap-4 h-full"
              style={{
                borderLeft: `3px solid ${hoveredTech.glowColor.replace("0.2", "0.9").replace("0.15", "0.8")}`
              }}
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    {hoveredTech.name} // Role & Integration
                  </h4>
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                    Active Module
                  </span>
                </div>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mt-1">
                  {hoveredTech.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 border border-neutral-900/30 border-dashed rounded-2xl flex items-center justify-center text-neutral-600 text-xs md:text-sm tracking-wider h-full select-none"
            >
              Hover over a skill node to inspect engineering use cases.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
