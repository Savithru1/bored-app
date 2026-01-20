"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WOULD_YOU_RATHER } from "@/lib/game-data";

export default function WouldYouRather() {
    const [current, setCurrent] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const [percentages, setPercentages] = useState<[number, number]>([50, 50]);

    const loadNew = () => {
        setLoading(true);
        setSelected(null);
        // Fake loading for effect
        setTimeout(() => {
            const pair = WOULD_YOU_RATHER[Math.floor(Math.random() * WOULD_YOU_RATHER.length)];
            setCurrent(pair);

            // Random percentages
            const p1 = Math.floor(Math.random() * 80) + 10;
            setPercentages([p1, 100 - p1]);

            setLoading(false);
        }, 400);
    };

    // Load first on mount
    useState(() => {
        loadNew();
    });

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        // Automatically load next after delay?
        setTimeout(loadNew, 2500);
    };

    if (loading || current.length === 0) return <div className="text-white/50 animate-pulse">Loading dilemma...</div>;

    return (
        <div className="w-full flex flex-col gap-6 p-4">
            {current.map((opt, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(idx)}
                    className={`
                    relative p-8 rounded-2xl cursor-pointer border transition-all overflow-hidden min-h-[120px] flex items-center justify-center text-center
                    ${selected === null ? 'bg-white/10 hover:bg-white/20 border-white/5' : ''}
                    ${selected === idx ? 'bg-indigo-500/50 border-indigo-500' : ''}
                    ${selected !== null && selected !== idx ? 'bg-black/20 opacity-50' : ''}
                `}
                >
                    {selected !== null && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentages[idx]}%` }}
                            className="absolute left-0 top-0 bottom-0 bg-white/10 -z-10"
                        />
                    )}

                    <h3 className="text-xl md:text-2xl font-bold z-10">{opt}</h3>

                    {selected !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-4 bottom-2 text-3xl font-black text-white/20"
                        >
                            {percentages[idx]}%
                        </motion.div>
                    )}
                </motion.div>
            ))}
            <div className="text-center text-white/30 text-sm mt-4">
                {selected !== null ? "Next dilemma incoming..." : "Choose wisely."}
            </div>
        </div>
    );
}
