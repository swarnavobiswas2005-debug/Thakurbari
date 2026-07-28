"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, GitFork, BookOpen, ExternalLink, Loader2 } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

interface Repository {
  name: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  isFork: boolean;
}

const LANG_COLORS: Record<string, string> = {
  typescript: "#3178c6",
  javascript: "#f7df1e",
  solidity: "#aa67cf",
  html: "#e34c26",
  css: "#563d7c",
  python: "#3572a5",
  go: "#00add8",
  rust: "#dea584",
  cplusplus: "#f34b7d",
  c: "#555555",
  shell: "#89e051",
};

const getLanguageColor = (lang: string | null): string => {
  if (!lang) return "#a3a3a3";
  return LANG_COLORS[lang.toLowerCase().replace("+", "plus")] || "#888888";
};

export default function GitHub() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const res = await fetch(
          "https://api.github.com/users/swarnavobiswas2005-debug/repos?per_page=100"
        );
        
        if (!res.ok) {
          throw new Error("Failed to fetch repository metadata");
        }

        const data = await res.json();
        
        // Map raw payload to our repository interface
        const formattedRepos: Repository[] = data.map((item: any) => ({
          name: item.name,
          description: item.description || "No description provided for this repository.",
          language: item.language,
          stars: item.stargazers_count,
          forks: item.forks_count,
          url: item.html_url,
          isFork: item.fork,
        }));

        // Filter out fork repositories and sort by star count (descending)
        const originalRepos = formattedRepos
          .filter((repo) => !repo.isFork)
          .sort((a, b) => b.stars - a.stars || b.name.localeCompare(a.name));

        // Take top 3 original repositories
        setRepos(originalRepos.slice(0, 3));
      } catch (err) {
        console.error("GitHub Fetch Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="github" className="relative py-28 px-4 md:px-8 max-w-6xl mx-auto border-t border-neutral-900/30">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Title */}
      <div className="mb-20 flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-accent-cyan animate-pulse" />
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent-cyan">
            OPEN SOURCE
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
          GitHub <span className="text-gradient">// Repositories</span>
        </h2>
        <p className="text-neutral-500 text-sm max-w-lg leading-relaxed mt-2">
          Streaming active source repositories and development projects directly from my GitHub profile interface.
        </p>
      </div>

      {/* Repos Cards Grid */}
      <div className="w-full min-h-[220px] mb-16">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`loader-${idx}`}
                  className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[220px] animate-pulse"
                >
                  <div className="flex flex-col gap-4">
                    <div className="h-4 bg-white/10 rounded w-2/3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-white/5 rounded w-full" />
                      <div className="h-3 bg-white/5 rounded w-5/6" />
                    </div>
                  </div>
                  <div className="h-3 bg-white/10 rounded w-1/3 mt-6" />
                </div>
              ))}
            </motion.div>
          ) : error || repos.length === 0 ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex items-center justify-center p-8 border border-neutral-900/50 border-dashed rounded-2xl text-neutral-500 text-xs tracking-wider min-h-[220px]"
            >
              <span>Could not fetch GitHub repositories. Please visit the profile link below.</span>
            </motion.div>
          ) : (
            <motion.div
              key="repos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {repos.map((repo, idx) => (
                <motion.div
                  key={repo.name}
                  whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.15)" }}
                  className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[220px] transition-colors duration-300 relative group"
                >
                  <div className="flex flex-col gap-3">
                    {/* Card Title Link */}
                    <div className="flex items-center justify-between">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-accent-cyan transition-colors font-bold text-sm tracking-wide group/link"
                      >
                        <span className="truncate max-w-[200px]">{repo.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                      <Github className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors flex-shrink-0" />
                    </div>

                    <p className="text-neutral-400 text-xs leading-relaxed font-normal line-clamp-4">
                      {repo.description}
                    </p>
                  </div>

                  {/* Bottom Meta */}
                  <div className="flex items-center justify-between text-xs mt-6 text-neutral-500">
                    <div className="flex items-center gap-4">
                      {/* Language Circle */}
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{repo.language}</span>
                        </div>
                      )}

                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-neutral-600" />
                        <span className="font-mono text-[10px]">{repo.stars}</span>
                      </div>

                      {/* Forks */}
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-neutral-600" />
                        <span className="font-mono text-[10px]">{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Centered Profile CTA */}
      <div className="flex justify-center">
        <MagneticButton strength={0.25} range={50}>
          <a
            href="https://github.com/swarnavobiswas2005-debug"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 h-14 bg-neutral-900 border border-neutral-800 text-white hover:border-white/20 transition-all font-semibold rounded-full shadow-lg"
          >
            <Github className="w-4 h-4 text-accent-cyan" />
            <span>Follow Swarnavo on GitHub</span>
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
