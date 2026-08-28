"use client";

import React from "react";

export default function GrainOverlay() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes grain-animation {
              0%, 100% { transform: translate(0, 0); }
              10% { transform: translate(-1%, -1%); }
              20% { transform: translate(-2%, 1%); }
              30% { transform: translate(1%, -2%); }
              40% { transform: translate(-1%, 3%); }
              50% { transform: translate(-2%, 1%); }
              60% { transform: translate(3%, -1%); }
              70% { transform: translate(2%, 1%); }
              80% { transform: translate(-1%, -1%); }
              90% { transform: translate(1%, 2%); }
            }

            .animated-grain {
              position: fixed;
              top: -50%;
              left: -50%;
              right: -50%;
              bottom: -50%;
              width: 200%;
              height: 200%;
              background: transparent url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E") repeat;
              opacity: 0.045;
              pointer-events: none;
              z-index: 9999;
              animation: grain-animation 0.4s steps(10) infinite;
              will-change: transform;
            }
          `,
        }}
      />
      <div className="animated-grain" aria-hidden="true" />
    </>
  );
}
