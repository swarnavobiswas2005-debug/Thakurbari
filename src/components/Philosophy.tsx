"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Philosophy() {
  const quoteWords = "Great interfaces aren't just designed — they're experienced.".split(" ");

  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center py-28 px-4 md:px-8 overflow-hidden border-t border-b border-neutral-900/30">
      
      {/* Animated Rotating Gradient Mesh Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-40 animate-aurora-spin"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(0, 82, 255, 0.08) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(157, 78, 221, 0.08) 0%, transparent 40%), radial-gradient(circle at 50% 40%, rgba(0, 245, 255, 0.06) 0%, transparent 35%)",
          }}
        />
        {/* Subtle grid pattern overlay inside mesh */}
        <div className="absolute inset-0 grid-lines opacity-[0.06]" />
      </div>

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6 z-10 select-none">
        
        {/* Minimal Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-neutral-500 mb-2"
        >
          <Quote className="w-12 h-12 text-accent-cyan" />
        </motion.div>

        {/* Massive Staggered Quote Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight text-white max-w-4xl">
          {quoteWords.map((word, idx) => {
            const isEmphasized = word.toLowerCase().includes("experienced");
            
            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.05,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`inline-block mr-3 sm:mr-4 ${
                  isEmphasized 
                    ? "text-gradient-accent underline decoration-accent-cyan/20 decoration-wavy underline-offset-8" 
                    : ""
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        {/* Small Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-neutral-400 mt-8"
        >
          Swarnavo Biswas • Design Creed
        </motion.p>
      </div>
    </section>
  );
}
