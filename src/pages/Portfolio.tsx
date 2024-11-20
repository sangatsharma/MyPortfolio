import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import {
  Code,
  Monitor,
  Cpu,
  User,
  Mail,
  Github,
  ExternalLink,
} from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with React, Node.js, and MongoDB",
    tags: ["React", "Node.js", "MongoDB", "TypeScript"],
    link: "#",
  },
  {
    title: "AI Dashboard",
    description: "Real-time analytics dashboard for machine learning models",
    tags: ["Python", "React", "TensorFlow", "AWS"],
    link: "#",
  },
  {
    title: "Social Media App",
    description: "Mobile-first social platform with real-time messaging",
    tags: ["React Native", "Firebase", "Redux", "Node.js"],
    link: "#",
  },
];

const skills = [
  {
    name: "Frontend",
    icon: <Monitor className="w-6 h-6" />,
    items: ["React", "TypeScript", "Next.js", "Tailwind"],
  },
  {
    name: "Backend",
    icon: <Cpu className="w-6 h-6" />,
    items: ["Node.js", "Python", "PostgreSQL", "AWS"],
  },
  {
    name: "Tools",
    icon: <Code className="w-6 h-6" />,
    items: ["Git", "Docker", "Jest", "CI/CD"],
  },
];

const Portfolio = () => {
  const { scrollYProgress } = useScroll();
  const skillsRef = useRef(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center z-10">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-4"
          >
            John Doe
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Full Stack Developer
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-400 leading-relaxed">
              I'm a passionate full-stack developer with 5 years of experience
              building modern web applications. I specialize in React,
              TypeScript, and Node.js, with a strong focus on creating
              performant and scalable solutions.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <User className="w-48 h-48 text-blue-500" />
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-4 md:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-6 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 md:px-8 bg-gray-800"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:hello@example.com"
              className="text-gray-400 hover:text-white"
            >
              <Mail className="w-8 h-8" />
            </a>
            <a
              href="https://Github.com"
              className="text-gray-400 hover:text-white"
            >
              <Github className="w-8 h-8" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-blue-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default Portfolio;
