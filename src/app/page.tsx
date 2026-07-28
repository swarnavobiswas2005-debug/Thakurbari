import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Philosophy from "@/components/Philosophy";
import GitHub from "@/components/GitHub";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Entry Hero (Anchor: #home) */}
      <Hero />
      
      {/* 2. Narrative About Section (Anchor: #about) */}
      <About />
      
      {/* 3. Tech Stack Capability Grid (Anchor: #tech) */}
      <TechStack />
      
      {/* 4. Scroll-Revealed Projects Showcase (Anchor: #projects) */}
      <Projects />
      
      {/* 5. Linear Progress Roadmap Journey (Anchor: #journey) */}
      <Journey />
      
      {/* 6. Typography Creed Section */}
      <Philosophy />
      
      {/* 7. Open Source GitHub Repository Show */}
      <GitHub />
      
      {/* 8. Connect Cards & Form Submit Section (Anchor: #contact) */}
      <Contact />
    </>
  );
}
