import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import Socials from "./Socials/Socials";

export const IntroAside: React.FC<IntroProps> = ({}) => {
  return (
    <div className="bg-secondary py-5 px-5">
      <div className="container">
        <div className="row align-items-center">
          
          <div className="col-sm-6 text-center">
            <img
              width="200"
              height="200"
              src={"/public/images/desktopIcon.png"}
              alt="profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface IntroProps {}

const Intro: React.FC<IntroProps> = () => {
  let title = "Sangat Sharma";
  let subTitle = [
    "Aspiring Software Engineer •",
    "Fullstack Web Developer •",
    "Tech Enthusiast",
  ];
  const { isDarkMode } = useThemeContext();

  return (
    <motion.div
      id="about"
      className="flex flex-col md:gap-8 md:flex-row py-5 px-5 h-auto  mb-2 "
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container md:w-2/3 md:order-1 order-2  border-red-400">
        <h3 className="font-bold text-xl">
          Hi there <span>👋</span>, I'm
        </h3>
        <h1 className="text-3xl md:text-6xl font-semibold">{title}</h1>
        <div
          className={`mt-4 flex flex-wrap gap-2 text-gray-400 ${
            isDarkMode ? "" : " text-white"
          }`}
        >
          {subTitle.map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </div>
        <section
          className={`mt-4 text-[1.1rem] text-[#b9bbc0] ${
            isDarkMode ? "" : "text-white"
          }`}
        >
          Passionate web developer dedicated to building innovative and
          user-friendly digital experiences.
        </section>
        <Socials />
      </div>
      <div className="md:order-2 order-1 md:w-1/3 mt-5 md:mt-0">
        {/* Aside content goes here */}
        <IntroAside />
      </div>
    </motion.div>
  );
};

export default Intro;
