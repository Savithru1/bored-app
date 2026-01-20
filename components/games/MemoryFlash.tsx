"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500"
];

export default function MemoryFlash() {
    const [state, setState] = useState<'idle' | 'showing' | 'input' | 'result'>('idle');
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const addToSequence = useCallback(() => {
        const next = Math.floor(Math.random() * 4);
        setSequence(prev => [...prev, next]);
        setUserSequence([]);
        setState('showing');
    }, []);

    // Play sequence
    useEffect(() => {
        if (state === 'showing') {
            let i = 0;
            const interval = setInterval(() => {
                if (i >= sequence.length) {
                    clearInterval(interval);
                    setActiveIdx(null);
                    setState('input');
                    return;
                }

                setActiveIdx(sequence[i]);
                setTimeout(() => setActiveIdx(null), 400); // lit duration
                i++;
            }, 800); // interval between flashes

            return () => clearInterval(interval);
        }
    }, [state, sequence]);

    const handleStart = () => {
        setSequence([]);
        setScore(0);
        addToSequence();
    };

    const handleTap = (idx: number) => {
        if (state !== 'input') return;

        // Flash the button manually on tap
        setActiveIdx(idx);
        setTimeout(() => setActiveIdx(null), 200);

        const match = sequence[userSequence.length] === idx;
        if (!match) {
            setState('result');
            return;
        }

        const newSeq = [...userSequence, idx];
        setUserSequence(newSeq);

        if (newSeq.length === sequence.length) {
            setScore(s => s + 1);
            setTimeout(addToSequence, 500); // Wait bit before next level
        }
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setState('idle');
        setScore(0);
        setSequence([]);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center min-h-[400px]">
            {state === 'idle' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center cursor-pointer p-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    onClick={handleStart}
                >
                    <BrainCircuit className="mx-auto mb-4 w-12 h-12 text-violet-400" />
                    <h3 className="text-2xl font-bold mb-2">Tap to Start</h3>
                    <p className="text-white/60">Repeat the pattern.</p>
                </motion.div>
            )}

            {(state === 'showing' || state === 'input') && (
                <div className="grid grid-cols-2 gap-4">
                    {COLORS.map((color, idx) => (
                        <motion.button
                            key={idx}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "w-24 h-24 rounded-2xl transition-all duration-100",
                                color,
                                activeIdx === idx
                                    ? "opacity-100 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.5)] brightness-150"
                                    : "opacity-40"
                            )}
                            onClick={() => handleTap(idx)}
                        />
                    ))}
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
                        <span className="text-xl text-white/50 block font-normal mt-2">levels passed</span>
                    </div>
                    <p className="text-white/80">
                        {score > 10 ? "Genius memory! 🧠" : score > 5 ? "Not bad! 👍" : "Fish memory? 🐟"}
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
