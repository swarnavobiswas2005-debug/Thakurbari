"use client";

import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const greetings = [
  "আসুন, বসুন!",
  "এক কাপ চা?",
  "কেমন আছেন?",
  "আড্ডা জমুক!",
  "প্রণাম!",
  "স্বাগতম!",
  "খবর কি?",
  "মিষ্টি খাবেন?",
  "জোড়াসাঁকোয় স্বাগত!"
];

export default function CallingBell() {
  const [bellCount, setBellCount] = useState(0);
  const [activeGreeting, setActiveGreeting] = useState<string | null>(null);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    const savedCount = localStorage.getItem("thakurbari_bell_count");
    if (savedCount) {
      setBellCount(parseInt(savedCount, 10));
    } else {
      // Start with a nostalgic offset
      const randomOffset = Math.floor(Math.random() * 150) + 120;
      setBellCount(randomOffset);
      localStorage.setItem("thakurbari_bell_count", randomOffset.toString());
    }
  }, []);

  const playBellSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Inharmonic frequencies to synthesize a metallic brass bell resonance
      const partials = [
        { freq: 440.0, gain: 0.35, decay: 2.0 },
        { freq: 554.37, gain: 0.25, decay: 1.5 },
        { freq: 659.25, gain: 0.20, decay: 1.2 },
        { freq: 880.0, gain: 0.15, decay: 0.8 },
        { freq: 1200.0, gain: 0.10, decay: 0.4 }
      ];

      partials.forEach((partial) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Triangle wave offers a warmer brass ring
        osc.type = "triangle";
        osc.frequency.value = partial.freq;

        // Strike envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(partial.gain, now + 0.005);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + partial.decay);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + partial.decay);
      });
    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  };

  const handleRing = () => {
    if (isRinging) return;
    
    playBellSound();
    setIsRinging(true);
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setActiveGreeting(randomGreeting);

    const nextCount = bellCount + 1;
    setBellCount(nextCount);
    localStorage.setItem("thakurbari_bell_count", nextCount.toString());

    setTimeout(() => setIsRinging(false), 500);
    setTimeout(() => setActiveGreeting(null), 1800);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .bell-container {
              position: fixed;
              bottom: 32px;
              left: 32px;
              z-index: 100;
              width: 130px;
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 4px;
              padding: 10px 12px;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              display: flex;
              align-items: center;
              gap: 10px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }

            .bell-container:hover {
              border-color: rgba(255, 255, 255, 0.35);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            }

            .bell-icon {
              color: #ffffff;
              transition: transform 0.1s ease;
            }

            .bell-container:hover .bell-icon {
              animation: bell-jiggle 0.6s ease infinite alternate;
            }

            .bell-icon.ringing {
              animation: bell-ring-hard 0.5s ease-in-out;
            }

            .bell-text {
              display: flex;
              flex-direction: column;
              text-align: left;
            }

            .bell-label {
              font-family: var(--font-body), sans-serif;
              font-size: 8px;
              font-weight: 700;
              letter-spacing: 0.1em;
              color: #ffffff;
              text-transform: uppercase;
            }

            .bell-count {
              font-family: monospace;
              font-size: 11px;
              color: #ffffff;
              opacity: 0.6;
              margin-top: 1px;
            }

            .greeting-bubble {
              position: absolute;
              bottom: 60px;
              left: 0;
              background: #0f0a07;
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 4px;
              padding: 6px 12px;
              color: #ffffff;
              font-family: var(--font-bengali), serif;
              font-size: 13px;
              white-space: nowrap;
              pointer-events: none;
              animation: bubble-fade-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              z-index: 101;
            }

            @keyframes bell-jiggle {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(10deg); }
            }

            @keyframes bell-ring-hard {
              0%, 100% { transform: rotate(0deg) scale(1); }
              20%, 60% { transform: rotate(-25deg) scale(1.1); }
              40%, 80% { transform: rotate(25deg) scale(1.1); }
            }

            @keyframes bubble-fade-up {
              0% { opacity: 0; transform: translateY(10px); }
              15% { opacity: 1; transform: translateY(0); }
              80% { opacity: 1; }
              100% { opacity: 0; transform: translateY(-15px); }
            }

            @media (max-width: 900px) {
              .bell-container {
                display: none; /* Hide on mobile to conserve bottom spacing */
              }
            }
          `
        }}
      />
      <div className="bell-container" onClick={handleRing}>
        {activeGreeting && (
          <div className="greeting-bubble">
            {activeGreeting}
          </div>
        )}
        <Bell className={`bell-icon w-4 h-4 ${isRinging ? "ringing" : ""}`} />
        <div className="bell-text">
          <span className="bell-label">ঘন্টা বাজান</span>
          <span className="bell-count">{bellCount} বার</span>
        </div>
      </div>
    </>
  );
}
