"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMousePosition";
import CodeEditor from "./CodeEditor";
import Terminal from "./Terminal";

function FloatingIcon({ children, x, y, depth = 1 }: { children: React.ReactNode; x: number; y: number; depth?: number }) {
  const { x: mx, y: my } = useMouseParallax(8 * depth);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [30 * depth, -30 * depth]);

  return (
    <div ref={ref} className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
      <motion.div style={{ y: scrollY }} className="relative">
        <motion.div
          animate={{ x: mx, y: my }}
          transition={{ type: "spring", stiffness: 30, damping: 12 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const { x: mx, y: my } = useMouseParallax(6);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full">
        {/* Floating tech symbols with mouse parallax */}
        <FloatingIcon x={8} y={20} depth={1.5}>
          <div className="text-3xl font-mono text-primary/10">&lt;div&gt;</div>
        </FloatingIcon>
        <FloatingIcon x={85} y={25} depth={1.2}>
          <div className="text-2xl font-mono text-purple-500/10">{ }</div>
        </FloatingIcon>
        <FloatingIcon x={92} y={60} depth={1.8}>
          <div className="text-xl font-mono text-green-500/10">npm start</div>
        </FloatingIcon>
        <FloatingIcon x={5} y={70} depth={0.8}>
          <div className="text-lg font-mono text-blue-500/10">import React</div>
        </FloatingIcon>
        <FloatingIcon x={50} y={12} depth={2}>
          <div className="text-4xl font-mono text-white/[0.02]">/</div>
        </FloatingIcon>
        <FloatingIcon x={80} y={85} depth={1.3}>
          <div className="text-2xl font-mono text-orange-500/10">git commit</div>
        </FloatingIcon>

        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light text-xs text-blue-400 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for opportunities
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
              >
                <span className="text-white">Hi, I&apos;m{" "}</span>
                <span className="gradient-text">Sangat</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-xl md:text-2xl text-white/60 mb-8 max-w-lg"
              >
                Full Stack Developer crafting exceptional digital experiences
                with modern web technologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="flex items-center gap-4 mb-12"
              >
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 text-primary font-medium overflow-hidden transition-all duration-300 hover:bg-primary/30"
                >
                  <span className="relative z-10">View My Work</span>
                  <ArrowDown className="relative z-10 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Github, href: "https://github.com/sangat7", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/in/sangatsharma", label: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/sangatcodes", label: "Twitter" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl glass-light text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="flex flex-wrap gap-3"
              >
                {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs rounded-full border border-white/10 text-white/50 font-mono"
                    >
                      {tech}
                    </span>
                  )
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="hidden lg:flex flex-col gap-6 items-end"
            >
              <motion.div
                animate={{ x: mx * 0.5, y: my * 0.3 }}
                transition={{ type: "spring", stiffness: 40, damping: 15 }}
                className="w-full max-w-md"
              >
                <CodeEditor />
              </motion.div>
              <motion.div
                animate={{ x: mx * 0.3, y: my * 0.5 }}
                transition={{ type: "spring", stiffness: 40, damping: 15 }}
                className="w-full max-w-sm"
              >
                <Terminal />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
