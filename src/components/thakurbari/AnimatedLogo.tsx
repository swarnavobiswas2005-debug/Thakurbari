"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

interface AnimatedLogoProps {
  isMusicPlaying: boolean;
  activeSection: string;
}

export default function AnimatedLogo({ isMusicPlaying, activeSection }: AnimatedLogoProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [pulseCount, setPulseCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const isHome = activeSection === "home";

  useEffect(() => {
    // Accessibility check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    // Mouse movement parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Trigger a single visual pulse when music starts playing
  useEffect(() => {
    if (isMusicPlaying) {
      setPulseCount((prev) => prev + 1);
    }
  }, [isMusicPlaying]);

  // Combine positioning translates with parallax mouse shifts
  const logoTransform = reducedMotion
    ? (isHome ? "translate(-50%, -50%)" : "none")
    : isHome
      ? `translate(calc(-50% + ${coords.x * 16}px), calc(-50% + ${coords.y * 16}px))`
      : `translate(${coords.x * 4}px, ${coords.y * 4}px)`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes logo-intro {
              0% {
                opacity: 0;
                filter: blur(8px);
                transform: scale(0.92);
              }
              100% {
                opacity: 1;
                filter: blur(0);
                transform: scale(1);
              }
            }

            @keyframes logo-idle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }

            @keyframes beat-pulse {
              0% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(212, 163, 115, 0)); }
              50% { transform: scale(1.025); filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.4)); }
              100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(212, 163, 115, 0)); }
            }

            .logo-wrapper {
              position: fixed;
              z-index: 100;
              transition: 
                top 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                left 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
              cursor: pointer;
              will-change: transform, top, left;
            }

            .logo-wrapper.state-home {
              top: 38%;
              left: 50%;
            }

            .logo-wrapper.state-compact {
              top: 32px;
              left: 32px;
            }

            .logo-img {
              height: auto;
              object-fit: contain;
              will-change: width, max-width, filter;
              transition: 
                width 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                max-width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .logo-wrapper.state-home .logo-img {
              width: 70vw;
              max-width: 620px;
            }

            .logo-wrapper.state-compact .logo-img {
              width: 25vw;
              max-width: 180px;
            }

            .logo-intro-anim {
              animation: logo-intro 1400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .logo-idle-anim {
              animation: logo-idle 6s ease-in-out infinite;
            }

            .logo-pulse-anim {
              animation: beat-pulse 0.6s cubic-bezier(0.25, 1, 0.5, 1) 1;
            }

            @media (max-width: 768px) {
              .logo-wrapper.state-home {
                top: 35%;
              }
              .logo-wrapper.state-home .logo-img {
                width: 85vw;
                max-width: 320px;
              }
              .logo-wrapper.state-compact {
                top: 20px;
                left: 20px;
              }
              .logo-wrapper.state-compact .logo-img {
                width: 38vw;
                max-width: 130px;
              }
            }
          `,
        }}
      />
      <div 
        className={`logo-wrapper ${isHome ? "state-home" : "state-compact"}`} 
        style={{ transform: logoTransform }}
        onClick={() => window.location.reload()}
      >
        <div className={reducedMotion ? "" : "logo-idle-anim"}>
          <img
            key={pulseCount} // Reset CSS keyframes when pulseCount changes
            src={siteConfig.logo}
            alt={siteConfig.brandName}
            className={`logo-img logo-intro-anim ${
              pulseCount > 0 && !reducedMotion ? "logo-pulse-anim" : ""
            }`}
          />
        </div>
      </div>
    </>
  );
}
