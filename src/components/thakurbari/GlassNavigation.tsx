"use client";

import React from "react";

export type SectionType = "home" | "music";

interface GlassNavigationProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

export default function GlassNavigation({ activeSection, setActiveSection }: GlassNavigationProps) {
  const tabs: { id: SectionType; label: string }[] = [
    { id: "home", label: "HOME" },
    { id: "music", label: "MUSIC" },
  ];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .nav-container {
              position: fixed;
              bottom: 32px;
              right: 32px;
              z-index: 100;
              display: flex;
              gap: 8px;
            }

            .glass-tab {
              font-family: var(--font-body), sans-serif;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.12em;
              color: #f4efe6;
              padding: 10px 20px;
              border-radius: 4px; /* sharp corners */
              background: rgba(15, 10, 7, 0.45); /* frosted glass */
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.12);
              box-shadow: 
                inset 0 1px 0 rgba(255, 255, 255, 0.05),
                0 4px 15px rgba(0, 0, 0, 0.3);
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
            }

            .glass-tab::after {
              content: "";
              position: absolute;
              bottom: 6px;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background-color: #ffffff; /* white active dot */
              opacity: 0;
              transform: scale(0);
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            }

            /* Inactive hover states on desktop */
            @media (hover: hover) {
              .glass-tab:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.25);
                transform: translateY(-2px) scale(1.02);
                color: #ffffff;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
              }
            }

            /* Active State */
            .glass-tab.active {
              background: rgba(255, 255, 255, 0.15);
              border-color: rgba(255, 255, 255, 0.4);
              color: #ffffff;
              font-weight: 700;
              box-shadow: 
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 8px 30px rgba(0, 0, 0, 0.4);
              padding-bottom: 12px;
              padding-top: 8px;
            }

            .glass-tab.active::after {
              opacity: 1;
              transform: scale(1);
            }

            @media (max-width: 900px) {
              .nav-container {
                bottom: 110px; /* Float above the mobile music player */
                left: 20px;
                right: 20px;
                justify-content: center;
                gap: 6px;
              }
              
              .glass-tab {
                flex: 1;
                font-size: 9px;
                letter-spacing: 0.08em;
                padding: 10px 10px;
              }

              .glass-tab.active {
                padding-bottom: 11px;
                padding-top: 9px;
              }
            }

            @media (max-width: 480px) {
              .nav-container {
                overflow-x: auto;
                justify-content: flex-start;
                padding-bottom: 6px;
                scrollbar-width: none; /* Hide scrollbar Firefox */
              }
              .nav-container::-webkit-scrollbar {
                display: none; /* Hide scrollbar Chrome/Safari */
              }
              .glass-tab {
                flex-shrink: 0;
                padding: 8px 16px;
              }
            }
          `,
        }}
      />
      <nav className="nav-container" aria-label="Main Navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`glass-tab ${activeSection === tab.id ? "active" : ""}`}
            onClick={() => setActiveSection(tab.id)}
            aria-current={activeSection === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </>
  );
}
