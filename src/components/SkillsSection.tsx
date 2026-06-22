"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMousePosition";
import { skills } from "@/lib/data";

function SkillNode({
  skill,
  index,
  total,
}: {
  skill: (typeof skills)[0];
  index: number;
  total: number;
}) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 120 + (index % 3) * 30;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const delay = index * 0.05;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="group relative"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold cursor-pointer transition-all duration-300"
          style={{
            backgroundColor: `${skill.color}15`,
            border: `1px solid ${skill.color}30`,
            boxShadow: `0 0 20px ${skill.color}10`,
          }}
        >
          <span style={{ color: skill.color }} className="text-xs font-mono">
            {skill.name.slice(0, 4)}
          </span>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <span className="text-xs text-white/60 font-mono">{skill.name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkillBar({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="flex items-center gap-3 group"
    >
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: skill.color }}
      />
      <span className="text-xs text-white/50 w-24 font-mono">{skill.name}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.03, duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            backgroundColor: skill.color,
            boxShadow: `0 0 10px ${skill.color}40`,
          }}
        />
      </div>
      <span className="text-xs text-white/30 font-mono w-8 text-right">
        {skill.level}%
      </span>
    </motion.div>
  );
}

function FloatingTechLabel({ text, x, y, speed, mouseFactor, color }: {
  text: string; x: number; y: number; speed: number; mouseFactor: number; color: string;
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
          transition={{ type: "spring", stiffness: 20, damping: 8 }}
          className="text-xs font-mono whitespace-nowrap"
          style={{ color: `${color}08` }}
        >
          {text}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const techParallaxData = [
    { text: "React 19", x: 3, y: 12, speed: 30, mouseFactor: 12, color: "#61dafb" },
    { text: "Next.js 15", x: 88, y: 20, speed: -25, mouseFactor: 10, color: "#ffffff" },
    { text: "TypeScript 5", x: 5, y: 40, speed: 20, mouseFactor: 8, color: "#3178c6" },
    { text: "Node.js 22", x: 90, y: 50, speed: -35, mouseFactor: 15, color: "#339933" },
    { text: "Tailwind CSS", x: 8, y: 65, speed: 25, mouseFactor: 11, color: "#06b6d4" },
    { text: "Three.js", x: 85, y: 80, speed: -20, mouseFactor: 9, color: "#ffffff" },
    { text: "Framer Motion", x: 50, y: 5, speed: 40, mouseFactor: 14, color: "#0055ff" },
    { text: "Docker", x: 92, y: 35, speed: -30, mouseFactor: 13, color: "#2496ed" },
  ];

  return (
    <section ref={ref} id="skills" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {techParallaxData.map((t, i) => (
          <FloatingTechLabel key={i} {...t} />
        ))}
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Skills & Technologies</span>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-lg text-white/50 max-w-3xl mb-16 leading-relaxed">
            Technologies I work with daily to build production-grade applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div style={{ y }} className="relative">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-sm font-medium text-white/60 mb-6 font-mono">
                {"> "} skill_tree — interconnected nodes
              </h3>
              <div className="relative h-[400px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary animate-pulse-glow" />
                  </div>
                </motion.div>
                {skills.map((skill, i) => (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    index={i}
                    total={skills.length}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            {categories.map((category) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="text-sm font-medium text-white/40 mb-4 font-mono uppercase tracking-wider">
                  {category}
                </h3>
                <div className="space-y-2">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, i) => (
                      <SkillBar key={skill.name} skill={skill} index={i} />
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
