"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample data - normally would be in game-data.ts but simple enough here
const PAIRS = [
    ["Coffee", "Tea"],
    ["Morning", "Night"],
    ["Summer", "Winter"],
    ["Cats", "Dogs"],
    ["Sweet", "Savory"],
    ["City", "Nature"],
    ["Books", "Movies"],
    ["Call", "Text"]
];

export default function ThisOrThat() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleChoice = (dir: number) => {
        setDirection(dir);
        setTimeout(() => {
            setIndex(i => (i + 1) % PAIRS.length);
            setDirection(0);
        }, 300);
    };

    const currentPair = PAIRS[index];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
            <div className="absolute top-4 text-white/30 text-sm">
                {index + 1} / {PAIRS.length}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction !== 0 ? 100 * -direction : 0, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction !== 0 ? 100 * direction : 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch w-full max-w-md px-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChoice(-1)}
                        className="flex-1 min-h-[160px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-3xl flex items-center justify-center p-6"
                    >
                        <span className="text-2xl font-bold">{currentPair[0]}</span>
                    </motion.button>

                    <div className="flex items-center justify-center text-white/30 font-bold">OR</div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChoice(1)}
                        className="flex-1 min-h-[160px] bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-500/30 rounded-3xl flex items-center justify-center p-6"
                    >
                        <span className="text-2xl font-bold">{currentPair[1]}</span>
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
