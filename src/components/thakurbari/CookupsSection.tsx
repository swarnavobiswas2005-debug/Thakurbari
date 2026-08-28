"use client";

import React from "react";

interface MenuItem {
  nameBn: string;
  nameEn: string;
  category: "Sweets" | "Mains" | "Starters";
  description: string;
  price: number;
  history: string;
}

const menuItems: MenuItem[] = [
  {
    nameBn: "মানকচুর জিলিপি",
    nameEn: "Mankochur Jilipi",
    category: "Sweets",
    description: "Crispy, syrup-filled sweet spirals made with grated arum-root (mankochu) instead of flour, flavored with ground cardamom.",
    price: 120,
    history: "A legendary Thakurbari kitchen invention created to surprise guests with how a common root vegetable could be turned into a delicate dessert."
  },
  {
    nameBn: "দইয়ের মালপোয়া",
    nameEn: "Doi-er Malpoa",
    category: "Sweets",
    description: "Soft, golden pancakes made from sweetened yogurt and fennel-infused flour, soaked in warm cardamomed sugar syrup.",
    price: 140,
    history: "A signature dish cooked by Mrinalini Devi (wife of Rabindranath Tagore) and served during the weekly literary meetings of the Khamkheyali Sabha."
  },
  {
    nameBn: "এলোঝেলো গজা",
    nameEn: "Elo Jhelo Gaja",
    category: "Sweets",
    description: "Crisp, delicate puff ribbons made with wheat flour and ghee, deep-fried to a golden crunch and glazed in light sugar syrup.",
    price: 95,
    history: "Rabindranath Tagore loved this snack's intricate braided look and crunchy texture, and personally named it 'Elo Jhelo'."
  },
  {
    nameBn: "মিঠা কাবাব",
    nameEn: "Mitha Kebab",
    category: "Starters",
    description: "Mildly spiced minced chicken patties flavored with raisins, cinnamon, cloves, and saffron-infused ghee.",
    price: 340,
    history: "Inspired by Tagore's travels to Turkey and Persia, recreated in the Jorasanko kitchen using Bengali spices and a signature hint of sweetness."
  },
  {
    nameBn: "মুরগির মাছের ঝোল",
    nameEn: "Murgir Macher Jhol",
    category: "Mains",
    description: "An experimental, double-protein light stew cooked with seasonal vegetables, combining chicken and river carp in a ginger-cumin broth.",
    price: 380,
    history: "Inventions of artist Abanindranath Tagore, who held unconventional cooking sessions where he subverted traditional recipe boundaries."
  },
  {
    nameBn: "পাঁঠার বাংলা",
    nameEn: "Panthar Bangla",
    category: "Mains",
    description: "Tender goat meat slow-cooked in a thin, highly aromatic gravy with halved potatoes, ginger paste, and freshly ground black pepper.",
    price: 420,
    history: "The trademark Sunday lunch dish of the Jorasanko household. Unlike heavy Mughlai mutton curries, this was light, peppery, and home-style."
  },
  {
    nameBn: "চিড়ের পুলি",
    nameEn: "Chirer Puli",
    category: "Sweets",
    description: "Steamed sweet dumplings made of a delicate flattened-rice dough, stuffed with freshly grated coconut and Nolen Gur (date palm liquid jaggery).",
    price: 160,
    history: "A winter seasonal specialty prepared during Poush Sankranti to celebrate the harvest of fresh rice and date palm sap."
  }
];

export default function CookupsSection() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .section-overlay {
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

            @keyframes overlay-fade-in {
              from { opacity: 0; transform: scale(1.02); filter: blur(5px); }
              to { opacity: 1; transform: scale(1); filter: blur(0); }
            }

             .editorial-container {
              max-width: 900px;
              margin: 0 auto;
              background: transparent; /* 100% transparent */
              border: 1px solid rgba(255, 255, 255, 0.15);
              box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
              border-radius: 4px; /* sharp corners */
              padding: 48px;
              position: relative;
            }

            .editorial-header {
              text-align: center;
              border-bottom: 1px solid rgba(255, 255, 255, 0.15);
              padding-bottom: 24px;
              margin-bottom: 40px;
            }

            .editorial-subtitle-bn {
              font-family: var(--font-bengali), serif;
              font-size: 28px;
              color: #ffffff; /* minimalist white */
              letter-spacing: 0.05em;
              margin-bottom: 4px;
            }

            .editorial-title {
              font-family: var(--font-display), serif;
              font-size: 44px;
              font-weight: 400;
              color: #f4efe6;
              letter-spacing: 0.05em;
              line-height: 1.1;
            }

            .editorial-desc {
              font-size: 13px;
              color: #f4efe6;
              opacity: 0.7;
              max-width: 500px;
              margin: 12px auto 0 auto;
              line-height: 1.6;
              letter-spacing: 0.02em;
            }

            .menu-grid {
              display: flex;
              flex-direction: column;
              gap: 36px;
            }

            .menu-item {
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 16px;
              border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
              padding-bottom: 24px;
            }

            .menu-item:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }

            .dish-title-row {
              display: flex;
              align-items: baseline;
              gap: 12px;
              flex-wrap: wrap;
            }

            .dish-bn {
              font-family: var(--font-bengali), serif;
              font-size: 20px;
              color: #f4efe6;
            }

            .dish-en {
              font-family: var(--font-display), serif;
              font-size: 18px;
              color: #ffffff;
              font-style: italic;
            }

            .dish-price {
              font-family: monospace;
              font-size: 16px;
              color: #f4efe6;
              font-weight: bold;
              align-self: flex-start;
              padding-top: 4px;
            }

            .dish-desc {
              font-size: 12.5px;
              color: #f4efe6;
              opacity: 0.8;
              line-height: 1.6;
              margin-top: 6px;
              max-width: 700px;
            }

            .dish-history {
              font-size: 11px;
              color: #ffffff;
              opacity: 0.65;
              font-style: italic;
              margin-top: 6px;
              border-left: 2px solid rgba(255, 255, 255, 0.3);
              padding-left: 10px;
              line-height: 1.5;
            }

            .category-tag {
              font-size: 9px;
              letter-spacing: 0.15em;
              color: #ffffff;
              border: 1px solid rgba(255, 255, 255, 0.3);
              padding: 2px 8px;
              border-radius: 4px; /* sharp edges tag */
              text-transform: uppercase;
              font-weight: bold;
              display: inline-block;
              margin-top: 8px;
            }

            @media (max-width: 768px) {
              .section-overlay {
                padding: 80px 16px 140px 16px;
              }
              .editorial-container {
                padding: 24px;
                border-radius: 16px;
              }
              .editorial-subtitle-bn {
                font-size: 22px;
              }
              .editorial-title {
                font-size: 32px;
              }
              .dish-bn {
                font-size: 18px;
              }
              .dish-en {
                font-size: 15px;
              }
              .dish-price {
                font-size: 14px;
              }
              .menu-item {
                grid-template-columns: 1fr;
                gap: 8px;
              }
              .dish-price {
                align-self: flex-start;
                padding-top: 0;
              }
            }
          `,
        }}
      />
      <div className="section-overlay">
        <div className="editorial-container">
          <div className="editorial-header">
            <div className="editorial-subtitle-bn">ঠাকুরবাড়ির রান্নাঘর</div>
            <h2 className="editorial-title">The Jorasanko Menu</h2>
            <p className="editorial-desc">
              Culinary experiments, travels, and legacies of the Tagore household. A fusion of Bengali heritage and international inspirations.
            </p>
          </div>

          <div className="menu-grid">
            {menuItems.map((item, idx) => (
              <div className="menu-item" key={idx}>
                <div className="text-left">
                  <div className="dish-title-row">
                    <span className="dish-bn">{item.nameBn}</span>
                    <span className="dish-en">{item.nameEn}</span>
                  </div>
                  <div>
                    <span className="category-tag">{item.category}</span>
                  </div>
                  <p className="dish-desc">{item.description}</p>
                  <p className="dish-history">{item.history}</p>
                </div>
                <div className="dish-price">₹{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
