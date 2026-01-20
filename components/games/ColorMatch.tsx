"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
    { name: "RED", hex: "#ef4444" },
    { name: "BLUE", hex: "#3b82f6" },
    { name: "GREEN", hex: "#22c55e" },
    { name: "YELLOW", hex: "#eab308" },
    { name: "PURPLE", hex: "#a855f7" },
];

export default function ColorMatch() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [current, setCurrent] = useState({ word: "", color: "", isMatch: false });

    useEffect(() => {
        if (state === 'playing') {
            const interval = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 0) {
                        setState('result');
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [state]);

    const generate = useCallback(() => {
        // 50% chance of match
        const isMatch = Math.random() > 0.5;
        const wordObj = COLORS[Math.floor(Math.random() * COLORS.length)];
        let colorObj = wordObj;

        if (!isMatch) {
            // Pick a different color
            const others = COLORS.filter(c => c.name !== wordObj.name);
            colorObj = others[Math.floor(Math.random() * others.length)];
        }

        setCurrent({
            word: wordObj.name,
            color: colorObj.hex,
            isMatch
        });
    }, []);

    const handleStart = () => {
        setState('playing');
        setScore(0);
        setTimeLeft(30);
        generate();
    };

    const handleChoice = (choice: boolean) => {
        if (choice === current.isMatch) {
            setScore(s => s + 1);
            // Bonus time? Nah, just score.
        } else {
            // Penalty or just wrong?
            // Let's subtract score to make it harder
            setScore(s => Math.max(0, s - 1));
            // Visual shake?
        }
        generate();
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setState('idle');
    };

    return (
        <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center">
            {state === 'idle' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center cursor-pointer p-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    onClick={handleStart}
                >
                    <Palette className="mx-auto mb-4 w-12 h-12 text-pink-500" />
                    <h3 className="text-2xl font-bold mb-2">Color Match</h3>
                    <p className="text-white/60">Does the word match the color?</p>
                </motion.div>
            )}

            {state === 'playing' && (
                <div className="w-full max-w-sm flex flex-col gap-8">
                    <div className="flex justify-between items-center px-4 font-mono text-xl">
                        <span className="text-white/50">Score: {score}</span>
                        <span className={timeLeft < 5 ? "text-red-500 animate-pulse" : "text-pink-400"}>{timeLeft}s</span>
                    </div>

                    <div className="flex flex-col items-center justify-center py-10 bg-white/5 rounded-3xl border border-white/5">
                        <h2
                            className="text-6xl font-black tracking-wider transition-colors duration-100"
                            style={{ color: current.color }}
                        >
                            {current.word}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 p-6 rounded-2xl text-2xl font-bold"
                            onClick={() => handleChoice(false)}
                        >
                            NO
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 p-6 rounded-2xl text-2xl font-bold"
                            onClick={() => handleChoice(true)}
                        >
                            YES
                        </motion.button>
                    </div>
                </div>
            )}

            {state === 'result' && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4 text-center"
                >
                    <div className="text-6xl font-black text-white">
                        {score}
                        <span className="text-xl text-white/50 block font-normal mt-2">matches found</span>
                    </div>
                    <p className="text-white/80">
                        {score > 25 ? "Brain on fire! 🔥" : score > 15 ? "Solid focus! 🎯" : "Brain fog? ☁️"}
                    </p>
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform mt-4"
                    >
                        <RefreshCcw size={18} /> Try Again
                    </button>
                </motion.div>
            )}
        </div>
    );
}
