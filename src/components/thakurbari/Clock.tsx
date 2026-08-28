"use client";

import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const formatTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });
        setTime(formatted);
      } catch (e) {
        // Fallback in case of local formatting errors
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istOffset = 5.5; // IST is UTC + 5.5 hours
        const istTime = new Date(utc + (3600000 * istOffset));
        
        const pad = (num: number) => num.toString().padStart(2, "0");
        setTime(`${pad(istTime.getHours())}:${pad(istTime.getMinutes())}`);
      }
    };

    formatTime();
    // Update every minute is enough since we only show hrs & mins,
    // but running every second ensures instant alignment on initial load.
    const interval = setInterval(formatTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .clock-wrapper {
              position: fixed;
              top: 36px;
              right: 40px;
              z-index: 100;
              font-family: var(--font-body), sans-serif; /* Clean modern font */
              font-weight: 500;
              color: #f4efe6;
              opacity: 0.85;
              letter-spacing: 0.05em;
              font-size: 13px;
              pointer-events: none;
              user-select: none;
              transition: opacity 0.5s ease;
            }

            .clock-loading {
              opacity: 0.3;
            }

            @media (max-width: 768px) {
              .clock-wrapper {
                top: 24px;
                right: 24px;
                font-size: 11px;
                letter-spacing: 0.03em;
              }
            }
          `,
        }}
      />
      <div className={`clock-wrapper ${!time ? "clock-loading" : ""}`}>
        {time || "--:--"}
      </div>
    </>
  );
}
