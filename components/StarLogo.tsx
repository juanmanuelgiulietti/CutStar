"use client";

import { motion } from "framer-motion";

/**
 * Faceted three-point star, recreated from the brand asset as SVG so the
 * hero renders self-contained (no missing-asset state). Drop-in replaceable:
 * swap the <svg> body for the supplied PNG/SVG asset if preferred.
 *
 * Brief: "Large semi-transparent star logo behind the headline, slow pulse
 * animation (not rotation)."
 */

type StarLogoProps = {
  className?: string;
};

// Geometry — three outer tips (one up, two down), three concave inner vertices.
const C = { x: 150, y: 150 };
const TIP_UP = { x: 150, y: 50 };
const TIP_DR = { x: 236.6, y: 200 };
const TIP_DL = { x: 63.4, y: 200 };
const IN_R = { x: 176, y: 135 }; // inner, upper-right
const IN_D = { x: 150, y: 180 }; // inner, bottom
const IN_L = { x: 124, y: 135 }; // inner, upper-left

const tri = (a: typeof C, b: typeof C, c: typeof C) =>
  `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`;

export default function StarLogo({ className }: StarLogoProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 300 300"
      role="img"
      aria-label="CUTSTAR logo"
      initial={{ scale: 0.96, opacity: 0.34 }}
      animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.34, 0.5, 0.34] }}
      transition={{
        duration: 6.5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <defs>
        <linearGradient id="starFaceLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9d83ff" />
          <stop offset="100%" stopColor="#7c5cfc" />
        </linearGradient>
        <linearGradient id="starFaceDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a4ce0" />
          <stop offset="100%" stopColor="#4a35a6" />
        </linearGradient>
        <filter id="starGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#starGlow)">
        {/* Top arm */}
        <polygon points={tri(C, IN_L, TIP_UP)} fill="url(#starFaceLight)" />
        <polygon points={tri(C, TIP_UP, IN_R)} fill="url(#starFaceDark)" />
        {/* Lower-right arm */}
        <polygon points={tri(C, IN_R, TIP_DR)} fill="url(#starFaceLight)" />
        <polygon points={tri(C, TIP_DR, IN_D)} fill="url(#starFaceDark)" />
        {/* Lower-left arm */}
        <polygon points={tri(C, IN_D, TIP_DL)} fill="url(#starFaceLight)" />
        <polygon points={tri(C, TIP_DL, IN_L)} fill="url(#starFaceDark)" />
      </g>
    </motion.svg>
  );
}
