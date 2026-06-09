"use client";

import Navbar from "@/components/Navbar";
import Intro from "@/components/Hero";
import CursorFollower from "@/components/MouseCursorCircle";
import PopupNavigation from "@/components/PopupNavigation";
import ContactSection from "@/components/ContactSection";
import AboutPage from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function HomePage() {
  return (
    <div className="flex flex-col md:gap-0 text-center md:text-left">
      <PopupNavigation />
      <CursorFollower />
      <Navbar />
      <main className="mx-auto md:max-w-7xl h-auto px-4 text-center md:text-left lg:px-36 z-10 md:mt-14">
        <Intro />
        <AboutPage />
        <Skills />
        <Projects />
      </main>
      <div className="flex flex-col justify-center items-center mx-auto h-auto bg-transparent/5 rounded-md">
        <ContactSection />
        <footer className="text-center">Sangat Sharma</footer>
      </div>
    </div>
  );
}
