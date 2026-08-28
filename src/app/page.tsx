"use client";

import React, { useState, useEffect } from "react";
import Background from "@/components/thakurbari/Background";
import GrainOverlay from "@/components/thakurbari/GrainOverlay";
import Clock from "@/components/thakurbari/Clock";
import AnimatedLogo from "@/components/thakurbari/AnimatedLogo";
import GlassNavigation, { SectionType } from "@/components/thakurbari/GlassNavigation";
import MusicPlayer from "@/components/thakurbari/MusicPlayer";
import { Sparkles, Disc } from "lucide-react";

export default function ThakurbariPage() {
  const [activeSection, setActiveSection] = useState<SectionType>("home");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [shouldPulseLogo, setShouldPulseLogo] = useState(false);
  const [prahar, setPrahar] = useState({
    title: "ভোরের ভৈরবী",
    english: "Dawn Raga",
    description: "Misty morning light in the Jorasanko courtyard. Smells of fresh luchis and ginger tea."
  });

  useEffect(() => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const istDate = new Date(utc + 3600000 * 5.5);
    const hour = istDate.getHours();

    if (hour >= 5 && hour < 9) {
      setPrahar({
        title: "ভোরের ভৈরবী",
        english: "Dawn Raga",
        description: "Misty morning light in the Jorasanko courtyard. Smells of fresh luchis and ginger tea."
      });
    } else if (hour >= 9 && hour < 17) {
      setPrahar({
        title: "দুপুরের রোদ্দুর",
        english: "Midday Solitude",
        description: "Sunlight filtering through wooden slates. Long lazy shadows on the brick columns."
      });
    } else if (hour >= 17 && hour < 21) {
      setPrahar({
        title: "বিকেলের স্মৃতি",
        english: "Sunset Adda",
        description: "Dusk settling over the ancient brick walls. Sound of harmonium tuning and hot snacks."
      });
    } else {
      setPrahar({
        title: "নিশীথের গান",
        english: "Night Courtyard",
        description: "Moonlight silvering the columns. Shadows of a bygone era. Silent, echoing beats."
      });
    }
  }, []);

  const handleFirstPlay = () => {
    setShouldPulseLogo(true);
    // Reset after animation completes
    setTimeout(() => {
      setShouldPulseLogo(false);
    }, 1000);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between select-none z-10">
      {/* 1. Aesthetics foundation */}
      <Background />
      <GrainOverlay />

      {/* 2. Brand elements & Utilities */}
      <AnimatedLogo isMusicPlaying={shouldPulseLogo} activeSection={activeSection} />
      <Clock />

      {/* Prahar time watch indicator */}
      {activeSection === "home" && (
        <div className="fixed top-8 left-8 z-50 pointer-events-none hidden md:block select-none">
          <div className="text-[9px] tracking-[0.25em] text-white/40 uppercase font-mono">
            প্রহর • CURRENT WATCH
          </div>
          <div className="font-display text-base text-white font-medium mt-0.5">
            {prahar.title}
          </div>
          <div className="text-[9px] tracking-[0.05em] text-white/50 italic font-mono mt-0.5">
            {prahar.english}
          </div>
        </div>
      )}

      {/* 3. Section Render Engine */}
      <div className="flex-grow w-full flex items-center justify-center relative">
        {/* Dynamic transition styling */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .hero-tagline-container {
                text-align: center;
                max-width: 600px;
                padding: 0 24px;
                z-index: 10;
                animation: tagline-reveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
              }

              @keyframes tagline-reveal {
                from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
                to { opacity: 1; transform: translateY(0); filter: blur(0); }
              }

              .home-title {
                font-family: var(--font-bengali), serif;
                font-size: 20px;
                color: #ffffff;
                letter-spacing: 0.15em;
                margin-bottom: 8px;
              }

              .home-desc {
                font-family: var(--font-display), serif;
                font-size: 32px;
                line-height: 1.3;
                color: #f4efe6;
                opacity: 0.9;
                font-weight: 300;
              }

              .divider {
                width: 40px;
                height: 1px;
                background-color: rgba(255, 255, 255, 0.3);
                margin: 20px auto;
              }

              .music-overlay {
                position: fixed;
                inset: 0;
                z-index: 50;
                width: 100%;
                height: 100%;
                overflow-y: auto;
                padding: 100px 40px 140px 40px;
                background: rgba(13, 7, 5, 0.6);
                animation: overlay-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }

              .music-container {
                max-width: 750px;
                margin: 0 auto;
                background: rgba(15, 10, 7, 0.6); /* frosted glass */
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.12);
                box-shadow: 
                  inset 0 1px 0 rgba(255, 255, 255, 0.05),
                  0 30px 70px rgba(0, 0, 0, 0.7);
                border-radius: 4px; /* sharp corners */
                padding: 48px;
                text-align: left;
              }

              .credit-item {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 14px;
                background: rgba(255, 255, 255, 0.03); /* subtle frosted item */
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 4px; /* sharp corners */
                margin-top: 12px;
              }

              @media (max-width: 768px) {
                .home-desc {
                  font-size: 24px;
                }
                .music-overlay {
                  padding: 80px 16px 140px 16px;
                }
                .music-container {
                  padding: 24px;
                }
              }
            `,
          }}
        />





        {activeSection === "music" && (
          <div className="music-overlay">
            <div className="music-container">
              <div className="border-b border-white/15 pb-4 mb-6 text-center">
                <span className="font-semibold text-xs tracking-[0.2em] text-white block mb-1">
                  ALBUM PRESERVES
                </span>
                <h2 className="font-display text-4xl text-[#f4efe6]">
                  Thakurbari Cookups Vol. 1
                </h2>
              </div>

              <div className="space-y-6 text-[#f4efe6] text-sm leading-relaxed">
                <p>
                  Music is a core current that breathes life into the Thakurbari environment. This compilation brings together contemporary artists to pay homage to the fusion, experimental, and classic sounds that once echoed through the hallways of Jorasanko.
                </p>

                <div>
                  <h3 className="font-display text-xl text-white border-b border-white/5 pb-2 mb-3">
                    Creative Collaborators
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="credit-item">
                      <Disc className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "3s" }} />
                      <div>
                        <h4 className="font-bold text-xs">Shandilya Banerjee</h4>
                        <p className="text-[10px] opacity-70">Acoustic, Flute, & Vocal Arrangements</p>
                      </div>
                    </div>

                    <div className="credit-item">
                      <Sparkles className="w-5 h-5 text-white" />
                      <div>
                        <h4 className="font-bold text-xs">AlphaInnit</h4>
                        <p className="text-[10px] opacity-70">Modern Beats & Electronic Synths</p>
                      </div>
                    </div>

                    <div className="credit-item">
                      <Disc className="w-5 h-5 text-white" />
                      <div>
                        <h4 className="font-bold text-xs">GRIM</h4>
                        <p className="text-[10px] opacity-70">Skit Dialogues & Storytelling</p>
                      </div>
                    </div>

                    <div className="credit-item">
                      <Sparkles className="w-5 h-5 text-white" />
                      <div>
                        <h4 className="font-bold text-xs">Rxyam</h4>
                        <p className="text-[10px] opacity-70">Mixing & Mastering Engineer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs italic opacity-70 pt-4 border-t border-white/5 text-center">
                  Listen to the track selection using the minimal audio player centered at the bottom of your viewport.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Controls & Navigation overlays */}
      <GlassNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <MusicPlayer onPlayStateChange={setIsMusicPlaying} onFirstPlay={handleFirstPlay} />

      {/* Signature Watermark */}
      <div 
        className="fixed bottom-1 right-8 z-50 select-none opacity-30 hover:opacity-85 transition-opacity duration-300 pointer-events-auto cursor-default"
      >
        <span 
          style={{ fontFamily: "var(--font-signature)" }} 
          className="text-sm md:text-lg text-white/80 tracking-wide"
        >
          Made By Nemesis
        </span>
      </div>
    </main>
  );
}
