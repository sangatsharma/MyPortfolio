import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute w-full z-0 h-full overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        className={`w-full h-full transition-opacity duration-5000  ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <g
          className="transform-gpu transition-transform duration-1000"
          style={{ transformOrigin: "center" }}
        >
          <circle
            cx="400"
            cy="300"
            r="80"
            className="animate-[spin_30s_linear_infinite] opacity-20"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
          />
          <circle
            cx="400"
            cy="300"
            r="60"
            className="animate-[spin_18s_linear_infinite_reverse] opacity-30"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
          />
          <circle
            cx="800"
            cy="200"
            r="40"
            className="animate-[spin_16s_linear_infinite] opacity-40"
            fill="none"
            stroke="#4FD1C5"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
