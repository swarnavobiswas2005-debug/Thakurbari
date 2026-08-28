# 🏛️ ঠাকুরবাড়ি Cookups — Thakurbari Cookups Vol. 1

> **"A traditional Bengali home, reimagined through modern digital culture."**

An immersive, music-driven digital mood-board celebrating the heritage of Jorasanko (the ancestral house of the Tagore family), local Kolkata nostalgia, and contemporary electronic fusion.

🔗 **Live Experience:** [thakurbari-nine.vercel.app](https://thakurbari-nine.vercel.app/)

---

## 🎨 Visual Philosophy & Concept

Inspired by experimental time-locked internet radio projects (like `busdriver.wtf`), the website is designed as a living parlor. It moves away from standard information cards and button grids to prioritize **atmosphere, feeling, and sensory depth**.

### 1. The Dynamic "Prahar" (প্রহর) Rotation
Bengali culture divides the solar day into eight *Prahars* (three-hour watches). The interface dynamically detects the visitor's local time (aligned to India Standard Time) and shifts the color tint of the Jorasanko courtyard background using color-burn overlays:

*   🌅 **Bhor (ভোর - Dawn: 5 AM – 9 AM):** *Bhorer Bhairavi* (Dawn Raga) — Tints the environment with a soft, misty pinkish-gold glow.
*   ☀️ **Dupur (দুপুর - Day: 9 AM – 5 PM):** *Duphurer Roddur* (Midday Solitude) — Rendered in crisp, natural, high-contrast sunlight.
*   🌇 **Sandhya (সন্ধ্যা - Evening: 5 PM – 9 PM):** *Bikeler Smriti* (Sunset Adda) — Immerses the courtyard in a rich amber-orange sunset.
*   🌃 **Nishi (নিশি - Night: 9 PM – 5 AM):** *Nishithero Gaan* (Night Courtyard) — Shadows settling in a deep indigo-blue moonlight.

### 2. High-Contrast Transparent Flat Design
Containers for text, navigation, and player items are styled with **100% transparency** and sharp geometric corners (`border-radius: 4px`). Text and borders float cleanly directly over the courtyard, maximizing visual depth and letting the graphics take center stage.

---

## 🛠️ Feature Set

*   🎵 **Invisible YouTube Streaming Deck:** Streams the official *Thakurbari Cookups Vol. 1* playlist using the YouTube IFrame API in an off-screen, lightweight player container.
*   ⏩ **State-Locked Autoplay Engine:** Implements duration progress tracking and video ID locking to prevent skipped tracks during state transitions. Auto-advances when a song ends.
*   ⌨️ **Spacebar Media Hotkey:** Press `Space` to toggle play/pause globally (safely disabled inside text elements, with page scrolling blocked).
*   🕒 **Minimal Clock:** Pinned to the top-right, showing live hours and minutes (`HH:MM`) in the modern sans-serif **Inter** font.
*   ✍️ **Calligraphy Watermark:** A custom hand-written watermark signature `"Made By Nemesis"` utilizing the **Caveat** font in the bottom-right corner.

---

## ⚙️ Tech Stack

*   **Framework:** Next.js (App Router, compiled via Turbopack)
*   **Aesthetics:** Tailwind CSS v4 & custom CSS variables
*   **Media:** YouTube IFrame Player API
*   **Fonts:** Noto Serif Bengali, Inter, Instrument Serif, Caveat (handwritten)
*   **Hosting:** Vercel

---

## 💻 Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/swarnavobiswas2005-debug/Thakurbari.git
   cd Thakurbari
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎹 Creative Collaborators

*   **Shandilya Banerjee** — Acoustic, Flute, & Vocal Arrangements
*   **AlphaInnit** — Modern Beats & Electronic Synths
*   **GRIM** — Skit Dialogues & Storytelling
*   **Rxyam** — Mixing & Mastering Engineer

---

*Made By Nemesis with 🤍 in Kolkata.*
