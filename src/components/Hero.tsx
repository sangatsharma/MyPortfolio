import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import Socials from "./Socials/Socials";

export const IntroAside: React.FC<IntroProps> = ({}) => {
  return (
    <div className="py-2 md:py-5 px-5">
      <div className="container">
        <div className="text-center">
          <img
            className="rounded-full"
            width="250"
            height="250"
            src={"/public/images/introImagea.jpg"}
            alt="profile"
          />
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
      className="flex flex-col md:gap-12 md:flex-row py-5 px-5 h-auto  mb-2 "
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
          className={`mt-4 flex justify-center md:justify-start text-left leading-4 flex-wrap gap-1 text-gray-400 ${
            isDarkMode ? "" : " text-white"
          }`}
        >
          {subTitle.map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </div>
        <section
          className={`mt-4 text-[1.1rem] leading-5 ${
            isDarkMode ? " text-[#b9bbc0]" : "text-white"
          }`}
        >
          Passionate web developer dedicated to building innovative and
          user-friendly digital experiences.
        </section>
        <Socials />
      </div>
      <div className="md:order-2 order-1 md:w-1/3 mt-5 flex justify-center md:justify-start md:mt-0  ">
        {/* Aside content goes here */}
        <IntroAside />
      </div>
    </motion.div>
  );
};

export default Intro;
