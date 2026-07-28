"use client";

import React, { useState, useEffect } from "react";
import { Compass, Menu, X, Github, Linkedin, Twitter } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Monitor scroll progress percentage
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        setScrollProgress(scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Active section tracking via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Detect when section is near center of screen
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Scroll Progress Bar */}
        <div 
          className="h-[2px] bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple transition-all duration-100 ease-out origin-left"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <nav className="glass-nav rounded-full h-16 flex items-center justify-between px-6 transition-all duration-500 shadow-2xl">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group text-white font-medium tracking-wider">
              <Compass className="w-5 h-5 text-accent-cyan animate-pulse-glow group-hover:rotate-45 transition-transform duration-500" />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                Swarnavo
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-all duration-300 relative py-2 ${
                    activeSection === item.href.slice(1)
                      ? "text-accent-cyan font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {/* Underline transition */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-cyan rounded-full transition-transform duration-300 origin-left ${
                      activeSection === item.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Right side CTA / Social icons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/swarnavobiswas2005-debug"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/swarnavo-biswas-53007a305/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Sanubiswas0010"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-neutral-400 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-center items-center gap-8 ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-bold tracking-widest uppercase transition-all duration-300 ${
                activeSection === item.href.slice(1) ? "text-accent-cyan" : "text-neutral-500 hover:text-white"
              }`}
              style={{
                transitionDelay: `${idx * 75}ms`,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Social Links */}
          <div className="flex items-center gap-6 mt-8">
            <a
              href="https://github.com/swarnavobiswas2005-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/swarnavo-biswas-53007a305/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/Sanubiswas0010"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
