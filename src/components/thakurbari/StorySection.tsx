"use client";

import React from "react";

export default function StorySection() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .story-overlay {
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

             .story-container {
              max-width: 900px;
              margin: 0 auto;
              background: transparent; /* 100% transparent */
              border: 1px solid rgba(255, 255, 255, 0.15);
              box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
              border-radius: 4px; /* sharp corners */
              padding: 48px;
              text-align: left;
            }

            .story-header {
              border-bottom: 1px solid rgba(255, 255, 255, 0.15);
              padding-bottom: 20px;
              margin-bottom: 32px;
              text-align: center;
            }

            .story-title-bn {
              font-family: var(--font-bengali), serif;
              font-size: 26px;
              color: #ffffff; /* minimalist white */
              margin-bottom: 4px;
            }

            .story-title-en {
              font-family: var(--font-display), serif;
              font-size: 40px;
              color: #f4efe6;
              font-weight: 400;
              letter-spacing: 0.05em;
            }

            .story-body {
              font-size: 13.5px;
              line-height: 1.8;
              color: #f4efe6;
              opacity: 0.9;
              display: flex;
              flex-direction: column;
              gap: 24px;
              letter-spacing: 0.02em;
            }

            .story-quote {
              border-left: 3px solid #ffffff; /* minimalist white */
              padding-left: 18px;
              margin: 12px 0;
              font-family: var(--font-display), serif;
              font-size: 18px;
              color: #ffffff;
              line-height: 1.5;
              font-style: italic;
            }

            .story-section-title {
              font-family: var(--font-display), serif;
              font-size: 22px;
              color: #ffffff;
              font-weight: 500;
              margin-top: 12px;
              border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
              padding-bottom: 6px;
            }

            .story-card-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px;
              margin-top: 16px;
            }

            .story-card {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.06);
              padding: 20px;
              border-radius: 4px; /* sharp corners */
            }

            .story-card h4 {
              font-family: var(--font-display), serif;
              font-size: 18px;
              color: #ffffff;
              margin-bottom: 8px;
            }

            .story-card p {
              font-size: 12px;
              line-height: 1.6;
              opacity: 0.8;
            }

            @media (max-width: 768px) {
              .story-overlay {
                padding: 80px 16px 140px 16px;
              }
              .story-container {
                padding: 24px;
              }
              .story-card-grid {
                grid-template-columns: 1fr;
              }
              .story-title-bn {
                font-size: 20px;
              }
              .story-title-en {
                font-size: 30px;
              }
            }
          `,
        }}
      />
      <div className="story-overlay">
        <div className="story-container">
          <div className="story-header">
            <div className="story-title-bn">ঠাকুরবাড়ির হেঁশেল ও আহার-সংস্কৃতি</div>
            <h2 className="story-title-en">The Kitchen Laboratory</h2>
          </div>

          <div className="story-body">
            <p>
              In the heart of Jorasanko, the ancestral home of the Tagores was not merely a sanctuary for poets, visual artists, and musicians. It was also an active **culinary laboratory**. Here, the boundaries of food were stretched and reinvented, blending classical Bengali home cooking with recipes collected from Mughal courts, Turkish travels, and European banquets.
            </p>

            <div className="story-quote">
              "To enter Jorasanko was to enter a sensory memory. A blend of fresh print ink, sound of the esraj, fragrance of slow-cooked ghee, and the aroma of cardamoms."
            </div>

            <p>
              Rabindranath Tagore was a passionate gourmet. In his extensive travels across Japan, Persia, Italy, and America, he collected dinner menus. Upon returning to Kolkata, he would hand these menus to the family cooks, urging them to recreate foreign delicacies like Turkish kebabs, English puddings, and French soups, adding a distinct Bengali tempering.
            </p>

            <h3 className="story-section-title">Guardians of the Taste</h3>
            
            <div className="story-card-grid">
              <div className="story-card">
                <h4>Pragnasundari Debi</h4>
                <p>
                  A pioneer of Bengali gastronomy, she compiled "Aamish o Niramish Ahar" in 1902. She wrote detailed, mathematically precise recipes and gave dishes poetic, romantic names, establishing cooking as an intellectual art form in Bengal.
                </p>
              </div>

              <div className="story-card">
                <h4>Mrinalini Devi</h4>
                <p>
                  Known for her extreme warmth, she oversaw Jorasanko's daily hospitality. She was a master of confectionery, inventing sweet snacks like arum-root jalebis (Mankochur Jilipi) and crispy ribbons (Elo Jhelo) to surprise Rabindranath's literary guests.
                </p>
              </div>
            </div>

            <p>
              **Thakurbari Cookups** is our humble attempt to preserve this beautiful, syncretic history. By bringing back the authentic recipes of the Tagore family kitchen, paired with modern sounds and digital art, we invite you to enter this nostalgic, home-cooked atmosphere.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
