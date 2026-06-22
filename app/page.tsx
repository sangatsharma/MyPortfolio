"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const ThreeBackground = dynamic(
  () => import("@/components/ThreeBackground"),
  { ssr: false }
);

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

const ParallaxBackground = dynamic(
  () => import("@/components/ParallaxLayers").then((m) => ({ default: m.ParallaxBackground })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <ThreeBackground />
      <ParticleBackground />
      <ParallaxBackground />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="border-t border-white/5 py-8">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} Sangat Sharma. Built with Next.js,
              Three.js & Framer Motion.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/20 font-mono">
              <span>const footer = () =&gt; innovation</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>deployed with &hearts;</span>
            </div>
          </div>
        </div>
      </footer>
    </SmoothScroll>
  );
}
