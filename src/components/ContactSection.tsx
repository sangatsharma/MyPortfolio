"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, Mail, MapPin, Phone, ArrowUpRight, Check } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMousePosition";
import { personalInfo } from "@/lib/data";

function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  const Component = href ? "a" : "button";
  const props = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { type: "submit" as const };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <Component
          {...props}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300 group"
        >
          {children}
        </Component>
      </motion.div>
    </div>
  );
}

function FloatingContactLabel({ text, x, y, speed, mouseFactor }: {
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

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const mailto = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${formState.message}`;
    window.open(mailto);
  }

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingContactLabel text="email.send(message)" x={-3} y={15} speed={30} mouseFactor={12} />
        <FloatingContactLabel text="await response" x={85} y={28} speed={-20} mouseFactor={10} />
        <FloatingContactLabel text="contact@dev" x={7} y={50} speed={35} mouseFactor={14} />
        <FloatingContactLabel text="200 OK" x={90} y={60} speed={-25} mouseFactor={8} />
        <FloatingContactLabel text="message.inbound()" x={4} y={75} speed={20} mouseFactor={16} />
        <FloatingContactLabel text="newConnection()" x={80} y={85} speed={-30} mouseFactor={11} />
      </div>

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-lg text-white/50 max-w-md mb-10 leading-relaxed">
              Have a project in mind or just want to say hi? I&apos;d love to hear
              from you.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: MapPin, label: "Location", value: personalInfo.location },
                { icon: Phone, label: "GitHub", value: "@sangat7", href: personalInfo.social.github },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="p-2.5 rounded-lg bg-white/5 text-white/30 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-primary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm text-white/60">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <MagneticButton href={`mailto:${personalInfo.email}`}>
              Send an Email
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ y }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-white/50">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
                <h3 className="text-lg font-semibold mb-2">Send a Message</h3>

                <div>
                  <label className="block text-sm text-white/40 mb-2 font-mono">
                    {"{ "}name{" }"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/40 mb-2 font-mono">
                    {"{ "}email{" }"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/40 mb-2 font-mono">
                    {"{ "}message{" }"}
                  </label>
                  <textarea
                    required
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all font-mono text-sm resize-none"
                  />
                </div>

                <MagneticButton>
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
