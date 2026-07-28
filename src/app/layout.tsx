import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CanvasBackground from "@/components/ui/CanvasBackground";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swarnavo Biswas | Creative Developer & Web3 Explorer",
  description: "Minimalist cinematic portfolio of Swarnavo Biswas, a Frontend Developer, Web Designer, and Web3 Explorer. Crafting premium user experiences with beautiful interfaces, clean typography, and smooth layouts.",
  keywords: ["Swarnavo Biswas", "Frontend Developer", "Web Designer", "Web3 Explorer", "Creative Developer", "Next.js Portfolio", "Awwwards Portfolio", "Cinematic Web Design"],
  authors: [{ name: "Swarnavo Biswas" }],
  openGraph: {
    title: "Swarnavo Biswas | Creative Developer & Web3 Explorer",
    description: "Minimalist cinematic portfolio. Crafting premium user experiences with beautiful interfaces, clean typography, and smooth layouts.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swarnavo Biswas | Creative Developer & Web3 Explorer",
    description: "Minimalist cinematic portfolio. Crafting premium user experiences with beautiful interfaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="relative bg-[#050505] text-white antialiased selection:bg-accent-blue/30 overflow-x-hidden min-h-screen">
        {/* Fractal Noise grain overlay - layered on top */}
        <div className="noise-overlay" />
        
        {/* Three.js Animated background - layered underneath */}
        <CanvasBackground />

        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 w-full min-h-screen flex flex-col">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
