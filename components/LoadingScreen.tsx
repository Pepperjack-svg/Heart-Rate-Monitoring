"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 1, delay: 4 }}
    >
      <div className="relative w-[300px] h-[100px] overflow-hidden">
        {/* Glowing pulse line */}
        <svg
          viewBox="0 0 300 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          {/* ECG waveform path */}
          <motion.path
            d="M0 50 L40 50 L60 30 L75 70 L90 50 L110 50 L130 20 L140 80 L160 50 L180 50 L200 30 L220 70 L240 50 L300 50"
            stroke="url(#pulseGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Glow effect */}
          <motion.path
            d="M0 50 L40 50 L60 30 L75 70 L90 50 L110 50 L130 20 L140 80 L160 50 L180 50 L200 30 L220 70 L240 50 L300 50"
            stroke="rgba(236, 72, 153, 0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Moving scan glow */}
          <motion.rect
            x="-60"
            y="0"
            width="60"
            height="100"
            fill="url(#scanGlow)"
            animate={{ x: [0, 300] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <defs>
            <linearGradient id="pulseGradient" x1="0" y1="0" x2="300" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>

            <linearGradient id="scanGlow" x1="0" y1="0" x2="60" y2="0">
              <stop offset="0%" stopColor="rgba(236,72,153,0.0)" />
              <stop offset="50%" stopColor="rgba(236,72,153,0.6)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0.0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.p
        className="mt-8 text-pink-400 text-sm tracking-wide font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Reading heart rate...
      </motion.p>
    </motion.div>
  );
}
