import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip"; // Import the custom Tooltip component
import { ResumeButton } from "./ResumeButton";

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
  window.open("/public/Sangat_Resume.pdf", "_blank");
};

const Socials: React.FC<SocialsProps> = () => {
  return (
    <div>
      <div className={`flex  gap-6 mt-4`}>
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
      <ResumeButton isDarkMode={false} onDownload={handleDownload} />
    </div>
  );
};

export default Socials;
