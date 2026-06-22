"use client";

import { useEffect, useState, useRef } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

export function useMouseParallax(sensitivity = 10) {
  const mouse = useMousePosition();
  const x = (mouse.x - 0.5) * sensitivity;
  const y = (mouse.y - 0.5) * sensitivity;
  return { x, y, mouseX: mouse.x, mouseY: mouse.y };
}
