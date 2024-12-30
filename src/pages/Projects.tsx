import React from "react";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import Tooltip from "../components/Socials/Tooltip";
import { useThemeContext } from "../context/ThemeContext";
import { AnimatedSvgText } from "../components/AnimatedSvgText";

interface ProjectCardProps {
  isDarkMode: boolean;
  projectTitle: string;
  projectDescription: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  isDarkMode,
  projectTitle,
  projectDescription,
  technologies,
  imageUrl,
  liveUrl,
  githubUrl,
}) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md  transition-all duration-300`}
      style={
        isDarkMode
          ? {
              background:
                "radial-gradient(ellipse at center bottom, #0b0f13 0%, #121a22 100%)",
            }
          : {
              background:
                "radial-gradient(ellipse at center bottom, #a793ce 0%, #4e9ef6 100%)",
            }
      }
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-full md:w-1/3 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-110">
          <img
            src={imageUrl}
            alt={projectTitle}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="flex flex-col w-full md:w-2/3">
          <span className="flex gap-2 justify-between">
            <h3 className="text-xl font-bold mb-2">{projectTitle}</h3>
            <span className="flex gap-2 justify-center items-center z-0">
              <Tooltip content="Preview" placement="top">
                <button
                  onClick={() => {
                    window.open(liveUrl, "_blank");
                  }}
                >
                  <FaPlayCircle className="text-2xl cursor-pointer" />
                </button>
              </Tooltip>
              <button
                onClick={() => {
                  window.open(githubUrl, "_blank");
                }}
              >
                <Tooltip content="Github" placement="top">
                  <FaGithub className="text-2xl cursor-pointer" />
                </Tooltip>
              </button>
            </span>
          </span>
          <p className="text-sm mb-4">{projectDescription}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`py-1 px-3 rounded-full text-xs font-medium transition-transform duration-200 hover:scale-110 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Easy Url Shortener",
      description:
        "A powerful URL shortener that generates compact, shareable links and provides personalized QR codes for easy access.",
      img: "/images/easyurl.png",
      tech: [
        "React",
        "Typescript",
        "Redux",
        "Node",
        "Express",
        "Redis",
        "MongoDB",
        "Tailwind CSS",
      ],
      liveUrl: "https://www.easyurl.me/",
      githubUrl: "https://github.com/sangatsharma/",
    },
    {
      id: 2,
      title: "Cook It Yourself",
      description:
        "A social platform for food enthusiasts to explore, save, and share their favorite recipes. Users can discover new recipes, share their own creations, and engage with the community through ratings and comments.",
      img: "/images/ciylight.png",
      tech: [
        "React",
        "Typescript",
        "Node",
        "Express",
        "PostgreSQL",
        "Cloudinary",
        "Tailwind CSS",
      ],
      liveUrl: "https://www.ciy.sangat.tech/",
      githubUrl: "https://github.com/sangatsharma/Recipe-recommender",
    },
    {
      id: 3,
      title: "Tic-Tac-Toe",
      description:
        "A classic Tic-Tac-Toe game with offline AI and real-time multiplayer modes for a fun, interactive experience.",
      img: "/images/tictactoe.png",
      tech: [
        "Javascript",
        "Websockets",
        "Express",
        "MiniMax Algorithm",
        "Progressive Web App",
      ],
      liveUrl: "https://sangatsharma.github.io/Tictactoe/",
      githubUrl: "https://github.com/sangatsharma/Tictactoe",
    },
  ];
  const { isDarkMode } = useThemeContext();
  return (
    <section className="py-4 px-2 relative text-white " id="projects">
      <AnimatedSvgText
        className=" hover:text-teal-200 text-8xl transition-all duration-500 transform hover:scale-105"
        text="My Works"
      />

      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        {projects.map((item) => (
          <div key={item.id} className="px-4 py-2 text-left rounded-lg">
            <ProjectCard
              isDarkMode={isDarkMode}
              projectTitle={item.title}
              projectDescription={item.description}
              technologies={item.tech}
              imageUrl={item.img}
              liveUrl={item.liveUrl}
              githubUrl={item.githubUrl}
            />
          </div>
        ))}
      </div>
      <button
        className={`text-md justify-center md:justify-start text-center md:text-xl md:pl-10 ml-6 mb-2 flex items-center gap-1 hover:translate-x-4 hover:underline transition-all duration-300 cursor-pointer`}
        onClick={() => {
          window.open(
            "https://github.com/sangatsharma?tab=repositories",
            "_blank"
          );
        }}
      >
        View more projects
        <span>
          <FaArrowRight />
        </span>
      </button>
    </section>
  );
};

export default Projects;
