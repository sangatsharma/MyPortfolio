import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip"; // Import the custom Tooltip component
import { ActionButton } from "./ActionButton";
import { useThemeContext } from "../../context/ThemeContext";

interface SocialsProps extends React.HTMLAttributes<HTMLDivElement> {}

const socials = [
  {
    id: 1,
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: FaLinkedin, // Assign imported icon directly
  },
  {
    id: 2,
    name: "GitHub",
    url: "https://github.com",
    icon: FaGithub,
  },
  {
    id: 3,
    name: "Email",
    url: "mailto:example@example.com",
    icon: FaEnvelope,
  },
];

const handleDownload = () => {
  window.open("/Sangat_Resume.pdf", "_blank");
};

const Socials: React.FC<SocialsProps> = () => {
const {isDarkMode} = useThemeContext()
  return (
    <div className="justify-center">


      <div className={`flex  gap-3 mt-8 justify-center md:justify-start`}>
        {socials.map((social) => (
          <Tooltip key={social.id} content={social.name}>
            <Link to={social.url} aria-label={social.name}>
              <social.icon
                size={32} // Add size prop to the icon
                color="white" // Add color prop to the icon
                className={`rounded-lg shadow-md hover:scale-105 `}
                aria-label={social.name}
              />
            </Link>
          </Tooltip>
        ))}
      </div>
      <div className="flex w-full gap-4  justify-center md:justify-start">
        <ActionButton isDarkMode={isDarkMode} onClick={handleDownload} text="View CV" />
        <ActionButton isDarkMode={isDarkMode} onClick={handleDownload} text="Hire Me" />
      </div>
      
    </div>
  );
};

export default Socials;
