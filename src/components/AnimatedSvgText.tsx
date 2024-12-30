import React from "react";

interface CursiveTextProps {
  text: string;
  className?: string;
}

export const AnimatedSvgText: React.FC<CursiveTextProps> = ({
  className = "",
  text,
}) => {
  return (
    <svg
      viewBox="0 0 300 120"
      className={`w-full max-w-[300px] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1">
            <animate
              attributeName="stop-color"
              values="currentColor;#818cf8;currentColor"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#818cf8" stopOpacity="1">
            <animate
              attributeName="stop-color"
              values="#818cf8;currentColor;#818cf8"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Background decorative swirls */}
      <g className="opacity-20">
        <path
          d="M10 60 C50 0, 100 120, 150 60 S250 0, 290 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
            M10 60 C50 0, 100 120, 150 60 S250 0, 290 60;
            M10 60 C50 120, 100 0, 150 60 S250 120, 290 60;
            M10 60 C50 0, 100 120, 150 60 S250 0, 290 60
          "
          />
        </path>
      </g>

      {/* Decorative flourishes */}
      <g className="animate-[dash_3s_ease-in-out_infinite]">
        <path
          d="M20 60 Q40 20 60 60 T100 60"
          fill="none"
          stroke="url(#textGradient)"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="-200"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M200 60 Q220 20 240 60 T280 60"
          fill="none"
          stroke="url(#textGradient)"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="-200"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Additional decorative elements */}
      <path
        d="M30 30 Q45 45 30 60 Q15 75 30 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      >
        <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="
          M30 30 Q45 45 30 60 Q15 75 30 90;
          M30 30 Q15 45 30 60 Q45 75 30 90;
          M30 30 Q45 45 30 60 Q15 75 30 90
        "
        />
      </path>
      <path
        d="M270 30 Q285 45 270 60 Q255 75 270 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      >
        <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="
          M270 30 Q285 45 270 60 Q255 75 270 90;
          M270 30 Q255 45 270 60 Q285 75 270 90;
          M270 30 Q285 45 270 60 Q255 75 270 90
        "
        />
      </path>

      {/* Main text */}
      <text
        x="150"
        y="70"
        textAnchor="middle"
        fill="url(#textGradient)"
        filter="url(#shadow)"
        style={{
          fontFamily: "cursive",
          fontSize: "42px",
          fontWeight: "bold",
        }}
      >
        {text}
      </text>

      {/* Decorative dots with connecting lines */}
      <g className="opacity-60">
        <circle cx="30" cy="90" r="3" fill="currentColor">
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="270" cy="90" r="3" fill="currentColor">
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
        <path
          d="M33 90 C80 90, 220 90, 267 90"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4,4"
          opacity="0.3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="8"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Floating particles */}
      <g className="opacity-40">
        {[...Array(5)].map((_, i) => (
          <circle key={i} r="1" fill="currentColor">
            <animateMotion
              dur={`${3 + i}s`}
              repeatCount="indefinite"
              path="M150,20 C100,40 200,80 150,100 C100,80 200,40 150,20"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};
