"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [bpm, setBpm] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/heartbeat");
      const data = await res.json();
      if (data.bpm) setBpm(data.bpm);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Show the animated loading screen first */}
      <LoadingScreen />

      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2 z-10">
        <span className="text-pink-500">❤️</span> Heart Rate Monitor
      </h1>

      <div className="text-6xl font-extrabold transition-all duration-500 z-10">
        {bpm ? `${bpm} BPM` : "-- BPM"}
      </div>

      <p className="mt-4 text-gray-400 text-sm z-10">
        {bpm ? "Live simulated data from Arduino Uno" : "Awaiting signal..."}
      </p>
    </main>
  );
}
