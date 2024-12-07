import * as React from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Hero";
import CursorFollower from "../components/MouseCursorCircle";
import PopupNavigation from "../components/PopupNavigation";
import ContactSection from "./ContactSection";
import { useThemeContext } from "../context/ThemeContext";
import AboutPage from "./About";
import Projects from "./Projects";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <div className="flex flex-col md:gap-0 text-center md:text-left">
      <PopupNavigation />
      <CursorFollower />
      <Navbar />
      <main
        className="mx-auto h-auto px-4 text-center md:text-left lg:px-[20%] md:mt-14"
        style={
          isDarkMode
            ? {
                background:
                  "radial-gradient(ellipse at center bottom, #1f2c39 0%, #000000 60%)",
              }
            : {
                background: "transparent",
              }
        }
      >
        <Intro />
        <AboutPage />
        <Projects />
      </main>

      <div className="h-auto bg-transparent/5">
        <ContactSection />
        <footer className="text-center">Sangat Sharma</footer>
      </div>
    </div>
  );
};

export default HomePage;
