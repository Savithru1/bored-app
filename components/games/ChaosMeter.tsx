"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CHAOS_LEVELS } from "@/lib/game-data";

export default function ChaosMeter() {
    const [level, setLevel] = useState(0);
    const [final, setFinal] = useState(false);

    useEffect(() => {
        // Animate up to a random number
        const target = Math.floor(Math.random() * 101);
        const duration = 2000; // 2s
        const start = Date.now();

        const interval = setInterval(() => {
            const now = Date.now();
            const progress = Math.min(1, (now - start) / duration);
            // Ease out
            const ease = 1 - Math.pow(1 - progress, 3);

            const current = Math.floor(target * ease);
            setLevel(current);

            if (progress >= 1) {
                clearInterval(interval);
                setFinal(true);
            }
        }, 16);

        return () => clearInterval(interval);
    }, []);

    const getChaosText = (val: number) => {
        return CHAOS_LEVELS.find(l => val <= l.max)?.text || CHAOS_LEVELS[CHAOS_LEVELS.length - 1].text;
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl text-white/50 mb-8 uppercase tracking-widest">Daily Chaos Level</h3>

            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                        cx="128" cy="128" r="120"
                        stroke="currentColor" strokeWidth="12"
                        className="text-white/5" fill="none"
                    />
                    <motion.circle
                        cx="128" cy="128" r="120"
                        stroke="currentColor" strokeWidth="12"
                        className="text-red-500" fill="none"
                        strokeDasharray={754} // 2 * pi * 120
                        strokeDashoffset={754 - (754 * level) / 100}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="flex flex-col items-center">
                    <span className="text-7xl font-black font-mono">{level}%</span>
                </div>
            </div>

            <div className="mt-8 h-8">
                {final && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold text-red-400"
                    >
                        {getChaosText(level)}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
