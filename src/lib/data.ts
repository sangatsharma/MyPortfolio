export const personalInfo = {
  name: "Sangat Sharma",
  title: "Full Stack Developer",
  tagline: "Crafting Digital Experiences with Code",
  description:
    "I architect and build full-stack web applications with modern technologies. Passionate about creating seamless, performant, and visually stunning digital experiences that push the boundaries of what's possible on the web.",
  email: "sangatsharma77@gmail.com",
  location: "India",
  resume: "/Sangat_Resume.pdf",
  social: {
    github: "https://github.com/sangat7",
    linkedin: "https://linkedin.com/in/sangatsharma",
    twitter: "https://x.com/sangatcodes",
  },
}

export const skills = [
  { name: "React", category: "Frontend", level: 95, color: "#61dafb" },
  { name: "Next.js", category: "Frontend", level: 92, color: "#ffffff" },
  { name: "TypeScript", category: "Language", level: 90, color: "#3178c6" },
  { name: "JavaScript", category: "Language", level: 95, color: "#f7df1e" },
  { name: "Node.js", category: "Backend", level: 88, color: "#339933" },
  { name: "Express", category: "Backend", level: 85, color: "#ffffff" },
  { name: "MongoDB", category: "Database", level: 82, color: "#47a248" },
  { name: "PostgreSQL", category: "Database", level: 78, color: "#4169e1" },
  { name: "Tailwind CSS", category: "Frontend", level: 93, color: "#06b6d4" },
  { name: "Three.js", category: "Frontend", level: 75, color: "#ffffff" },
  { name: "Framer Motion", category: "Frontend", level: 85, color: "#0055ff" },
  { name: "TanStack Query", category: "Frontend", level: 82, color: "#ff4154" },
  { name: "WebSocket", category: "Backend", level: 78, color: "#ffffff" },
  { name: "Docker", category: "DevOps", level: 72, color: "#2496ed" },
  { name: "Git", category: "DevOps", level: 90, color: "#f05032" },
]

export const projects = [
  {
    title: "Enterprise Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization, interactive charts, and collaborative features built for enterprise clients.",
    tags: ["React", "TypeScript", "Node.js", "WebSocket", "PostgreSQL"],
    image: "/images/project1.jpg",
    color: "#60a5fa",
    links: { github: "#", live: "#" },
    metrics: { stars: 42, forks: 12, users: "1.2k" },
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce solution with payment integration, inventory management, AI-powered recommendations, and responsive design.",
    tags: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Redis"],
    image: "/images/project2.jpg",
    color: "#a78bfa",
    links: { github: "#", live: "#" },
    metrics: { stars: 38, forks: 8, users: "3.4k" },
  },
  {
    title: "Real-Time Chat App",
    description:
      "Scalable messaging platform with end-to-end encryption, file sharing, video calls, and real-time synchronization across devices.",
    tags: ["React", "WebSocket", "Node.js", "Socket.io", "Docker"],
    image: "/images/project3.jpg",
    color: "#f472b6",
    links: { github: "#", live: "#" },
    metrics: { stars: 56, forks: 15, users: "850" },
  },
  {
    title: "DevOps Pipeline Tool",
    description:
      "CI/CD pipeline visualization and management tool with real-time deployment tracking, container orchestration, and monitoring dashboards.",
    tags: ["Next.js", "TypeScript", "Docker", "GraphQL", "Redis"],
    image: "/images/project4.jpg",
    color: "#34d399",
    links: { github: "#", live: "#" },
    metrics: { stars: 29, forks: 6, users: "420" },
  },
]

export const experience = [
  {
    title: "Full Stack Developer",
    company: "Freelance / Self-Employed",
    period: "2023 - Present",
    description:
      "Architected and built full-stack web applications for diverse clients. Specialized in React ecosystems, Node.js backends, and cloud deployment.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB"],
  },
  {
    title: "Web Developer Intern",
    company: "Tech Company",
    period: "2022 - 2023",
    description:
      "Contributed to the development of internal tools and client-facing applications. Collaborated on API design, database schema, and frontend architecture.",
    technologies: ["React", "Express", "PostgreSQL", "Git"],
  },
  {
    title: "Computer Science Graduate",
    company: "University",
    period: "2019 - 2023",
    description:
      "Bachelor's degree in Computer Science with focus on software engineering, data structures, and web technologies.",
    technologies: ["C++", "Python", "JavaScript", "SQL"],
  },
]

export const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Technologies Used", value: 30, suffix: "+" },
  { label: "Happy Clients", value: 20, suffix: "+" },
]

export const codeSnippets = [
  {
    language: "typescript",
    code: `const Portfolio = () => {
  const [innovation, setInnovation] = useState(true);
  const [passion, setPassion] = useState(true);
  
  const build = useCallback(async () => {
    while (passion) {
      await create.awesome.experiences();
      innovation && push.boundaries();
    }
  }, [innovation, passion]);
  
  useEffect(() => { build(); }, []);
  return <DigitalExperience />;
};`,
  },
  {
    language: "bash",
    code: `$ npm install developer-excellence
+ developer-excellence@1.0.0
$ npx create-magic
✨ Creating your digital experience...
  ✔ React components optimized
  ✔ Animations configured
  ✔ Performance tuned
  ✔ Deployed to production
  ✨ Build complete in 2.4s`,
  },
]

export const terminalLines = [
  { text: "Initializing portfolio environment...", type: "info" },
  { text: "Loading developer skills matrix...", type: "success" },
  { text: "Compiling project components...", type: "info" },
  { text: "Optimizing rendering pipeline...", type: "success" },
  { text: "Establishing WebSocket connection...", type: "info" },
  { text: "Connection established successfully", type: "success" },
  { text: "Portfolio ready on localhost:3000", type: "system" },
  { text: "Awaiting user interaction...", type: "info" },
]
