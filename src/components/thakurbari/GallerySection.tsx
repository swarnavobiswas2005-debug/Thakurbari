"use client";

import React from "react";

interface GalleryItem {
  src: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
}

const items: GalleryItem[] = [
  {
    src: "/assets/gallery-courtyard.jpg",
    title: "Jorasanko Courtyard",
    subtitle: "জোড়াসাঁকো ঠাকুরবাড়ি",
    description: "The red brick courtyard of the Jorasanko mansion, serving as the physical and creative center of the Tagore family's cultural renaissance.",
    year: "Circa 1900"
  },
  {
    src: "/assets/gallery-sweets.jpg",
    title: "Mrinalini's Confections",
    subtitle: "দইয়ের মালপোয়া ও জিলিপি",
    description: "Authentic Doi-er Malpoa and Mankochur Jilipi sweets prepared on traditional brassware, matching Mrinalini Devi's historic recipes.",
    year: "Circa 1895"
  },
  {
    src: "/assets/gallery-kebab.jpg",
    title: "Mitha Kebab Sizzling",
    subtitle: "মিঠা কাবাব",
    description: "Mouth-watering minced meat patties spiced with cinnamon, cardamom, and raisins, grilling over a charcoal-fired clay hearth.",
    year: "Circa 1912"
  }
];

export default function GallerySection() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .gallery-overlay {
              position: fixed;
              inset: 0;
              z-index: 50;
              width: 100%;
              height: 100%;
              overflow-y: auto;
              padding: 100px 40px 140px 40px;
              background: rgba(13, 7, 5, 0.45);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              animation: overlay-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .gallery-container {
              max-width: 1100px;
              margin: 0 auto;
              text-align: center;
            }

            .gallery-header {
              margin-bottom: 40px;
            }

            .gallery-title-bn {
              font-family: var(--font-bengali), serif;
              font-size: 24px;
              color: #ffffff; /* minimalist white */
              margin-bottom: 4px;
            }

            .gallery-title-en {
              font-family: var(--font-display), serif;
              font-size: 40px;
              color: #f4efe6;
              font-weight: 400;
              letter-spacing: 0.05em;
            }

            .gallery-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 32px;
              justify-content: center;
              padding: 12px 0;
            }

            /* Vintage Polaroid Album Style */
            .polaroid-card {
              background: #f4efe6; /* Ivory paper */
              border-radius: 4px;
              padding: 16px 16px 24px 16px;
              box-shadow: 
                0 15px 35px rgba(0, 0, 0, 0.5),
                0 2px 5px rgba(0, 0, 0, 0.2);
              transform: rotate(-1deg);
              transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              cursor: pointer;
            }

            .polaroid-card:nth-child(2) {
              transform: rotate(1.5deg) translateY(-8px);
            }

            .polaroid-card:nth-child(3) {
              transform: rotate(-1.5deg) translateY(4px);
            }

            @media (hover: hover) {
              .polaroid-card:hover {
                transform: rotate(0deg) scale(1.03) translateY(-10px);
                box-shadow: 
                  0 25px 50px rgba(0, 0, 0, 0.6),
                  0 4px 12px rgba(0, 0, 0, 0.3);
              }
            }

            .polaroid-img-wrapper {
              width: 100%;
              aspect-ratio: 3/2;
              overflow: hidden;
              background-color: #0f0a07;
              border: 1px solid rgba(0, 0, 0, 0.08);
              margin-bottom: 16px;
              position: relative;
            }

            .polaroid-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              filter: sepia(0.15) contrast(0.95);
              transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            }

            .polaroid-card:hover .polaroid-img {
              transform: scale(1.05);
            }

            .polaroid-content {
              text-align: left;
              color: #1a0f0d; /* Charcoal ink */
            }

            .polaroid-caption-bn {
              font-family: var(--font-bengali), serif;
              font-size: 14px;
              color: #000000; /* minimalist neutral black */
              font-weight: bold;
              margin-bottom: 2px;
            }

            .polaroid-title {
              font-family: var(--font-display), serif;
              font-size: 22px;
              font-weight: 500;
              line-height: 1.1;
              color: #1a0f0d;
              display: flex;
              justify-content: space-between;
              align-items: baseline;
            }

            .polaroid-year {
              font-family: monospace;
              font-size: 9px;
              color: #7a6e67;
              border: 1px solid rgba(122, 110, 103, 0.3);
              padding: 1px 6px;
              border-radius: 4px;
            }

            .polaroid-desc {
              font-size: 11px;
              line-height: 1.5;
              color: #4a3e37;
              margin-top: 8px;
              opacity: 0.95;
            }

            @media (max-width: 900px) {
              .gallery-grid {
                grid-template-columns: 1fr;
                gap: 40px;
                max-width: 480px;
                margin: 0 auto;
              }
              .polaroid-card, .polaroid-card:nth-child(2), .polaroid-card:nth-child(3) {
                transform: none;
              }
            }
          `,
        }}
      />
      <div className="gallery-overlay">
        <div className="gallery-container">
          <div className="gallery-header">
            <div className="gallery-title-bn">স্মৃতিচিত্র ও দৃশ্যপট</div>
            <h2 className="gallery-title-en">The Archival Gallery</h2>
          </div>

          <div className="gallery-grid">
            {items.map((item, idx) => (
              <div className="polaroid-card" key={idx}>
                <div className="polaroid-img-wrapper">
                  <img src={item.src} alt={item.title} className="polaroid-img" />
                </div>
                <div className="polaroid-content">
                  <div className="polaroid-caption-bn">{item.subtitle}</div>
                  <h3 className="polaroid-title">
                    <span>{item.title}</span>
                    <span className="polaroid-year">{item.year}</span>
                  </h3>
                  <p className="polaroid-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
