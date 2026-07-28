"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Library, FolderGit2 } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const PROJECTS: Project[] = [
  {
    title: "notes.swarnavo.co.in",
    subtitle: "Cloud Notes & Digital Garden",
    description: "A minimal, premium markdown note-taking application and personal knowledge base. Engineered with layout grids, offline-first syncing, LaTeX mathematical parsing, and nesting file systems.",
    image: "/swarnavo_notes.jpg",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Markdown Parser", "LocalStorage"],
    githubUrl: "https://github.com/swarnavobiswas2005-debug",
    liveUrl: "https://notes.swarnavo.co.in/",
  },
];

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="glass rounded-3xl overflow-hidden mb-16 md:mb-24 last:mb-0 border border-white/5 shadow-2xl flex flex-col lg:flex-row items-stretch min-h-[450px]"
    >
      {/* 1. Large Project Image Wrapper */}
      <div className={`w-full lg:w-1/2 relative overflow-hidden group/img min-h-[300px] lg:min-h-auto ${isEven ? "lg:order-first" : "lg:order-last"}`}>
        {/* Soft color overlay that fades out on hover */}
        <div className="absolute inset-0 bg-neutral-950/20 group-hover/img:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
        {/* Custom glass shine animation on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
        
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover scale-100 group-hover/img:scale-105 transition-transform duration-700 ease-out"
          priority={index === 0}
        />
      </div>

      {/* 2. Text description section */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between items-start">
        <div className="w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-accent-cyan uppercase">
              {project.subtitle}
            </span>
            <span className="text-xs font-semibold text-neutral-600 font-mono">
              // PROJECT_0{index + 1}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4 uppercase">
            {project.title}
          </h3>

          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold tracking-wider px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons with Magnetic Effects */}
        <div className="flex items-center gap-4 w-full">
          {/* Demo button */}
          <MagneticButton strength={0.2} range={35}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 h-11 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] text-xs uppercase tracking-wider"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </MagneticButton>

          {/* GitHub button */}
          <MagneticButton strength={0.2} range={35}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 h-11 bg-transparent border border-white/10 text-white hover:border-white/30 transition-all font-semibold rounded-full text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto border-t border-neutral-900/30">
      
      {/* Decorative Blob */}
      <div className="absolute top-[30%] -left-[10%] w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Section Title */}
      <div className="mb-20 flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-accent-cyan" />
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent-cyan">
            PORTFOLIO
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
          Featured <span className="text-gradient">// Projects</span>
        </h2>
        <p className="text-neutral-500 text-sm max-w-lg leading-relaxed mt-2">
          A curate select list of web platforms, layout frameworks, and smart interface bindings compiled with 60fps interaction models.
        </p>
      </div>

      {/* Projects List mapping */}
      <div className="flex flex-col">
        {PROJECTS.map((project, index) => (
          <ProjectItem key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
