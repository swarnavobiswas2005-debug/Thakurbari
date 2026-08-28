"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

export default function Background() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tintColor, setTintColor] = useState("rgba(255, 255, 255, 0)");

  useEffect(() => {
    // Check accessibility settings
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleQueryChange);

    // Calculate dynamic time watch (Prahar) color tint in IST
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const istDate = new Date(utc + 3600000 * 5.5);
    const hour = istDate.getHours();

    let color = "rgba(255, 255, 255, 0)"; // Dupur (Clear Day: 9 AM - 5 PM)
    if (hour >= 5 && hour < 9) {
      color = "rgba(244, 63, 94, 0.05)"; // Bhor (Dawn Pink: 5 AM - 9 AM)
    } else if (hour >= 17 && hour < 21) {
      color = "rgba(251, 146, 60, 0.06)"; // Sandhya (Dusk Amber: 5 PM - 9 PM)
    } else if (hour >= 21 || hour < 5) {
      color = "rgba(30, 58, 138, 0.07)"; // Nishi (Midnight Indigo: 9 PM - 5 AM)
    }
    setTintColor(color);

    if (mediaQuery.matches) return;

    // Mouse movement handler for interactive parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      mediaQuery.removeEventListener("change", handleQueryChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const bgTransform = reducedMotion
    ? "scale(1)"
    : `scale(1.05) translate(${coords.x * -15}px, ${coords.y * -15}px)`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slow-breathe {
              0%, 100% { transform: scale(1.05); }
              50% { transform: scale(1.08); }
            }

            .bg-container {
              position: fixed;
              inset: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
              overflow: hidden;
              background-color: #0d0705;
            }

            .bg-image {
              width: 100%;
              height: 100%;
              background-image: url("${siteConfig.background}");
              background-size: cover;
              background-position: center;
              transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
              will-change: transform;
            }

            .bg-animate {
              animation: slow-breathe 25s ease-in-out infinite;
            }

            .vignette-overlay {
              position: fixed;
              inset: 0;
              pointer-events: none;
              z-index: 3;
              background: radial-gradient(
                circle at center,
                rgba(13, 7, 5, 0.15) 0%,
                rgba(13, 7, 5, 0.45) 60%,
                rgba(13, 7, 5, 0.9) 100%
              );
            }

            .warm-tint {
              position: fixed;
              inset: 0;
              pointer-events: none;
              z-index: 2;
              transition: background-color 1s ease-in-out;
              mix-blend-mode: color-burn;
            }
          `,
        }}
      />
      <div className="bg-container">
        <div 
          className={`bg-image ${reducedMotion ? "" : "bg-animate"}`} 
          style={{ transform: bgTransform }}
        />
        <div className="warm-tint" style={{ backgroundColor: tintColor }} />
        <div className="vignette-overlay" />
      </div>
    </>
  );
}
