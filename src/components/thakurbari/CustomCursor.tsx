"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMusicHover, setIsMusicHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports touch/mobile
    const checkMobile = () => {
      const mobile = 
        window.matchMedia("(max-width: 768px)").matches || 
        ("ontouchstart" in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkMobile();
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Determine interactive hovering
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.closest(".playlist-item") ||
        target.closest(".glass-tab") ||
        target.style.cursor === "pointer";

      setIsHovered(!!isInteractive);

      // Determine music player hovering
      const isMusicElement = target.closest(".player-container") !== null;
      setIsMusicHover(isMusicElement);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    // Apply cursor: none globally on desktop
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-cursor {
              position: fixed;
              top: 0;
              left: 0;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #38bdf8;
              pointer-events: none;
              z-index: 99999;
              transform: translate(-50%, -50%);
              transition: 
                width 0.25s ease, 
                height 0.25s ease, 
                background-color 0.25s ease, 
                border-color 0.25s ease;
            }

            .custom-cursor-ring {
              position: fixed;
              top: 0;
              left: 0;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              border: 1px solid rgba(56, 189, 248, 0.4);
              pointer-events: none;
              z-index: 99998;
              transform: translate(-50%, -50%);
              transition: 
                width 0.25s ease, 
                height 0.25s ease, 
                transform 0.1s ease-out;
              will-change: transform;
            }

            /* Hover states */
            .custom-cursor.hovered {
              width: 4px;
              height: 4px;
              background-color: #f4efe6;
            }

            .custom-cursor-ring.hovered {
              width: 38px;
              height: 38px;
              border-color: #38bdf8;
              background-color: rgba(56, 189, 248, 0.08);
            }

            /* Music hover visual */
            .cursor-note {
              position: absolute;
              top: -12px;
              right: -12px;
              font-size: 11px;
              color: #38bdf8;
              animation: cursor-note-float 1.2s ease-in-out infinite alternate;
            }

            @keyframes cursor-note-float {
              0% { transform: translateY(0) scale(0.9); }
              100% { transform: translateY(-3px) scale(1.1); }
            }
          `,
        }}
      />
      <div 
        className={`custom-cursor ${isHovered ? "hovered" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      >
        {isMusicHover && <span className="cursor-note">♫</span>}
      </div>
    </>
  );
}
