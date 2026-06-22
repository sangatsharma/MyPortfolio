"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { text: 'import { Developer } from "./types";', color: "text-purple-400" },
  { text: "", color: "" },
  { text: "interface PortfolioConfig {", color: "text-blue-300" },
  { text: "  theme: Theme;", color: "text-yellow-300", indent: 1 },
  { text: "  animations: boolean;", color: "text-yellow-300", indent: 1 },
  { text: "  performance: 'max' | 'balanced';", color: "text-yellow-300", indent: 1 },
  { text: "}", color: "text-blue-300" },
  { text: "", color: "" },
  { text: "const developer: Developer = {", color: "text-blue-300" },
  { text: '  name: "Sangat Sharma",', color: "text-green-300", indent: 1 },
  { text: '  role: "Full Stack Developer",', color: "text-green-300", indent: 1 },
  { text: "  skills: [", color: "text-blue-300", indent: 1 },
  { text: '    "React", "Next.js", "TypeScript",', color: "text-orange-300", indent: 2 },
  { text: '    "Node.js", "Tailwind CSS",', color: "text-orange-300", indent: 2 },
  { text: "  ],", color: "text-blue-300", indent: 1 },
  { text: "  passionate: true,", color: "text-purple-300", indent: 1 },
  { text: "  available: true", color: "text-green-300", indent: 1 },
  { text: "};", color: "text-blue-300" },
];

export default function CodeEditor() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < codeLines.length) return prev + 1;
        return prev;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl w-full max-w-lg">
      <div className="bg-[#1e1e2e] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-white/40 ml-2 font-mono">
          developer.ts — Portfolio
        </span>
      </div>
      <div className="bg-[#1a1a2e] p-4 min-h-[300px] font-mono text-sm">
        <div className="flex">
          <div className="text-white/20 text-right pr-4 select-none space-y-0.5">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="space-y-0.5">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  visibleLines > i
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -10 }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`leading-6 whitespace-pre ${
                  line.color || "text-white/30"
                }`}
                style={{ paddingLeft: (line.indent || 0) * 16 }}
              >
                {line.text || "\u00A0"}
                {visibleLines > i && visibleLines === i + 1 && (
                  <span className="inline-block w-2 h-4 bg-blue-400 animate-terminal-blink ml-0.5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
