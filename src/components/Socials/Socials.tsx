"use client";

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Tooltip from "./Tooltip";
import { ActionButton } from "./ActionButton";
import { useThemeContext } from "../../context/ThemeContext";

interface SocialsProps extends React.HTMLAttributes<HTMLDivElement> {}

const socials = [
  {
    id: 1,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sangat-sharma-080b6a215/",
    icon: FaLinkedin, 
  },
  {
    id: 2,
    name: "GitHub",
    url: "https://github.com/sangatsharma/",
    icon: FaGithub,
  },
  {
    id: 3,
    name: "Email",
    url: "mailto:sangatsharma2@gmail.com",
    icon: FaEnvelope,
  },
];

const handleDownload = () => {
  window.open("/Sangat_Resume.pdf", "_blank");
};

const Socials: React.FC<SocialsProps> = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <div className="justify-center">
      <div className={`flex gap-3 mt-8 justify-center md:justify-start`}>
        {socials.map((social) => (
          <Tooltip key={social.id} content={social.name}>
            <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
              <social.icon
                size={32}
                color="white"
                className={`rounded-lg shadow-md hover:scale-105`}
                aria-label={social.name}
              />
            </a>
          </Tooltip>
        ))}
      </div>
      <span className="flex md:text-left text-center justify-center md:justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 20"
          fill="none"
          stroke="currentColor"
          className="w-40 h-6 text-teal-200 text-primary-500"
        >
          <path
            d="M2 10c20-8 50-8 100 0s80 8 96 0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M2 12c20 5 50 5 100 0s80-5 96 0"
            strokeWidth="1"
            strokeLinecap="round"
            className="opacity-50"
          />
        </svg>
      </span>
      <div className="flex w-full gap-4  justify-center md:justify-start">
        <ActionButton
          isDarkMode={isDarkMode}
          onClick={handleDownload}
          text="View CV"
        />
        <ActionButton
          isDarkMode={isDarkMode}
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          text="Hire Me"
        />
      </div>
    </div>
  );
};

export default Socials;
