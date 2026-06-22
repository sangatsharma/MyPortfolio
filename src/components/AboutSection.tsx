"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Code2, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMousePosition";
import { personalInfo, stats, experience } from "@/lib/data";

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function StatCard({
  label,
  value,
  suffix,
  index,
}: {
  label: string;
  value: number;
  suffix: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="glass-card rounded-xl p-6 text-center hover:bg-white/[0.03] transition-colors"
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <div className="text-sm text-white/50">{label}</div>
    </motion.div>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof experience)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary/50 border-2 border-primary" />
      {index < experience.length - 1 && (
        <div className="absolute left-[5px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 to-transparent" />
      )}
      <div className="glass-card rounded-xl p-5 hover:bg-white/[0.03] transition-colors">
        <span className="text-xs text-primary font-mono">{item.period}</span>
        <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
        <p className="text-sm text-white/60 mt-0.5">{item.company}</p>
        <p className="text-sm text-white/40 mt-2 leading-relaxed">{item.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {item.technologies.map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/40 font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ParallaxCode({ text, x, y, speed, mouseFactor }: { text: string; x: number; y: number; speed: number; mouseFactor: number }) {
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

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden">
      {/* Background parallax code elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ParallaxCode text="function createExperience() {" x={-5} y={15} speed={40} mouseFactor={10} />
        <ParallaxCode text="  return <Portfolio />;" x={75} y={30} speed={-30} mouseFactor={14} />
        <ParallaxCode text="  const [ready, setReady] = useState(true)" x={0} y={55} speed={50} mouseFactor={8} />
        <ParallaxCode text="  useEffect(() => { init(); }, []);" x={65} y={70} speed={-20} mouseFactor={12} />
        <ParallaxCode text="  async function load() {" x={5} y={85} speed={35} mouseFactor={9} />
        <ParallaxCode text="    await Promise.all([...])" x={80} y={92} speed={-40} mouseFactor={15} />
        <ParallaxCode text="  export default Developer" x={50} y={8} speed={25} mouseFactor={11} />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Building the <span className="gradient-text">Future</span> of Web
          </h2>
          <p className="text-lg text-white/50 max-w-3xl mb-16 leading-relaxed">
            {personalInfo.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div style={{ y }}>
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Experience
            </h3>
            <div className="space-y-0">
              {experience.map((item, i) => (
                <TimelineItem key={item.title} item={item} index={i} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              What I Do
            </h3>

            {[
              {
                title: "Full-Stack Development",
                description: "Building end-to-end applications with React, Next.js, Node.js, and modern databases. Focused on clean architecture and scalable solutions.",
                icon: Code2,
              },
              {
                title: "UI/UX Engineering",
                description: "Creating pixel-perfect interfaces with smooth animations, responsive design, and accessible components using Tailwind CSS and Framer Motion.",
                icon: GraduationCap,
              },
              {
                title: "API & Backend Design",
                description: "Designing RESTful and GraphQL APIs with robust authentication, real-time capabilities, and optimized database schemas.",
                icon: Calendar,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl p-5 hover:bg-white/[0.03] transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
