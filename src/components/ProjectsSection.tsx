"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Users, ArrowUpRight } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMousePosition";
import { projects } from "@/lib/data";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        <motion.div
          animate={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="glass-card rounded-2xl overflow-hidden"
          style={{ borderColor: `${project.color}20` }}
        >
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.01]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: project.color }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="text-4xl font-bold tracking-tight opacity-20"
                  style={{ color: project.color }}
                >
                  {project.title.slice(0, 2).toUpperCase()}
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <a
                href={project.links.github}
                className="p-2 rounded-lg bg-black/50 text-white/60 hover:text-white hover:bg-black/70 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.links.live}
                className="p-2 rounded-lg bg-black/50 text-white/60 hover:text-white hover:bg-black/70 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white/5 text-white/40 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" /> {project.metrics.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" /> {project.metrics.forks}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {project.metrics.users}
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${50 + tilt.x * 10}% ${50 + tilt.y * 10}%, ${project.color}08, transparent 60%)`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function FloatingProjectLabel({ text, x, y, speed, mouseFactor }: {
  text: string; x: number; y: number; speed: number; mouseFactor: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const { x: mx, y: my } = useMouseParallax(mouseFactor);

  return (
    <div ref={ref} className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
      <motion.div style={{ y: scrollY }}>
        <motion.div
          animate={{ x: mx, y: my }}
          transition={{ type: "spring", stiffness: 25, damping: 10 }}
          className="font-mono text-white/[0.02] text-xs md:text-sm whitespace-nowrap"
        >
          {text}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} id="projects" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingProjectLabel text="git push origin main" x={-2} y={18} speed={35} mouseFactor={12} />
        <FloatingProjectLabel text="npm run build" x={82} y={30} speed={-25} mouseFactor={10} />
        <FloatingProjectLabel text="deploy --prod" x={5} y={50} speed={40} mouseFactor={14} />
        <FloatingProjectLabel text="CI/CD pipeline" x={88} y={65} speed={-30} mouseFactor={8} />
        <FloatingProjectLabel text="docker compose up" x={3} y={78} speed={20} mouseFactor={16} />
        <FloatingProjectLabel text="pnpm test" x={78} y={88} speed={-35} mouseFactor={11} />
        <FloatingProjectLabel text="merge request" x={50} y={10} speed={25} mouseFactor={13} />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Featured Projects</span>
          <h2 className="section-title">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-lg text-white/50 max-w-3xl mb-16 leading-relaxed">
            A selection of projects that showcase my skills and passion for
            building exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/sangat7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-light text-white/60 hover:text-white hover:bg-white/10 transition-all group"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
