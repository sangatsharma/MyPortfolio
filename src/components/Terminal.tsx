"use client";

import { useState, useEffect } from "react";

const lines = [
  { text: "> Initializing developer environment...", color: "text-blue-400" },
  { text: "> Loading skills matrix...", color: "text-blue-400" },
  { text: "> ✓ 15 modules loaded successfully", color: "text-green-400" },
  { text: "> Compiling project components...", color: "text-blue-400" },
  { text: "> ✓ Build completed in 2.4s", color: "text-green-400" },
  { text: "> Starting development server...", color: "text-yellow-400" },
  { text: "> Portfolio ready on port 3000", color: "text-green-400" },
  { text: "> Waiting for connections...", color: "text-white/50" },
];

export default function Terminal() {
  const [visible, setVisible] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => {
        if (prev < lines.length) return prev + 1;
        return prev;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl w-full max-w-md">
      <div className="bg-[#1e1e2e]/90 px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-white/40 ml-2 font-mono">terminal</span>
      </div>
      <div className="bg-black/80 p-4 min-h-[200px] font-mono text-sm">
        {lines.slice(0, visible).map((line, i) => (
          <div key={i} className={`${line.color} leading-6`}>
            {line.text}
          </div>
        ))}
        {visible <= lines.length && (
          <span
            className={`text-white ${showCursor ? "opacity-100" : "opacity-0"}`}
          >
            _
          </span>
        )}
      </div>
    </div>
  );
}
