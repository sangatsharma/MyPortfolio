import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Socials from "./Socials/Socials";
import ScrollIndicator from "./ScrollIndicator";
import BubbleText from "./BubbleText";

export const IntroAside: React.FC<IntroProps> = ({}) => {
  return (
    <div className="py-2 md:py-5 px-5 z-10">
      <div className="container">
        <div className="text-center">
          <img
            className="rounded-full"
            width="250"
            height="250"
            src={"/images/introImagea.jpg"}
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
  const { scrollY } = useScroll();

  // Create smooth scroll with spring physics
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Create transform values based on smoothed scroll position
  const y1 = useTransform(smoothScrollY, [0, 300], [0, 100]);
  const y2 = useTransform(smoothScrollY, [0, 300], [0, -100]);

  // Constant floating animation variants
  const floatingAnimation = {
    initial: {
      y: 0,
    },
    floating: {
      y: [-20, 20],
      transition: {
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  // Slightly different timing for second element
  const floatingAnimationAlt = {
    initial: {
      y: 0,
    },
    floating: {
      y: [-15, 15],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div>
              {/* Floating elements with combined animations */}
              <motion.div
  style={{ y: y1 }}
  initial="initial"
  animate="floating"
  variants={floatingAnimation}
  className="absolute left-44 top-50 z-0"
>
  <motion.div
    animate={{
      rotate: 360,
      scale: [1, 1.1, 1],
    }}
    transition={{
      rotate: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
      scale: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }}
    className={`w-20 h-20 md:w-32 md:h-32 rounded-full ${
      isDarkMode
        ? "bg-gradient-to-b from-blue-900 to-black"
        : "bg-gradient-to-t from-blue-500 to-blue-300 opacity-60"
    }`}
  />
</motion.div>

<motion.div
  style={{ y: y2 }}
  initial="initial"
  animate="floating"
  variants={floatingAnimationAlt}
  className="absolute right-20 bottom-20 z-0"
>
  <motion.div
    animate={{
      rotate: -360,
      scale: [1, 1.2, 1],
    }}
    transition={{
      rotate: {
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      },
      scale: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }}
    className={`w-20 h-20 md:w-32 md:h-32 rounded-full ${
      isDarkMode
        ? "bg-gradient-to-b from-blue-900 to-black"
        : "bg-gradient-to-t from-blue-500 to-blue-300 opacity-60"
    }`}
  />
</motion.div>
      <motion.div
        id="about"
        className="flex flex-col md:gap-12 md:flex-row py-5 px-5 h-auto mb-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >



        <div className="container md:w-2/3 md:order-1 order-2 border-red-400 z-10">
          <h3 className="font-bold text-xl">
            Hi there <span>👋</span>, I'm
          </h3>
          <h1 className="text-3xl md:text-6xl font-semibold">{<BubbleText text={title}/>}</h1>
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
            className={`mt-4 text-[1.1rem] z-20 leading-5 ${
              isDarkMode ? " text-[#b9bbc0]" : "text-white"
            }`}
          >
            Passionate web developer dedicated to building innovative and
            user-friendly digital experiences.
          </section>

          <Socials />
        </div>
        <div className="md:order-2 order-1 md:w-1/3 mt-5 flex justify-center md:justify-start md:mt-0">
          {/* Aside content goes here */}
          <IntroAside />
        </div>
      </motion.div>
      <div>
        <ScrollIndicator />
      </div>
    </div>
  );
};

export default Intro;