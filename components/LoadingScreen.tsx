"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
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
      <div className="relative w-[340px] h-[120px]">
        <svg
          viewBox="0 0 340 100"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          {/* ECG waveform line */}
          <motion.path
            d="M0 50 
               L40 50 
               L55 30 L70 70 L85 50 
               L120 50 
               L135 40 L145 60 L155 50 
               L180 50 
               L195 30 L210 70 L225 50 
               L260 50 
               L275 40 L285 60 L295 50 
               L340 50"
            stroke="url(#ecgGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.2,
            }}
          />

          {/* Glow overlay */}
          <motion.path
            d="M0 50 
               L40 50 
               L55 30 L70 70 L85 50 
               L120 50 
               L135 40 L145 60 L155 50 
               L180 50 
               L195 30 L210 70 L225 50 
               L260 50 
               L275 40 L285 60 L295 50 
               L340 50"
            stroke="rgba(236,72,153,0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.2,
            }}
          />

          {/* Moving glow scan */}
          <motion.rect
            x="-60"
            y="0"
            width="60"
            height="100"
            fill="url(#scanGlow)"
            animate={{ x: [0, 340] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <defs>
            <linearGradient id="ecgGradient" x1="0" y1="0" x2="340" y2="0">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>

            <linearGradient id="scanGlow" x1="0" y1="0" x2="60" y2="0">
              <stop offset="0%" stopColor="rgba(236,72,153,0)" />
              <stop offset="50%" stopColor="rgba(236,72,153,0.6)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.p
        className="mt-6 text-pink-400 text-sm tracking-wide font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Reading heart rate...
      </motion.p>
    </motion.div>
  );
}
