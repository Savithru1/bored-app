"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MOODS = [
    { color: "#ef4444", label: "Angry" }, // Red
    { color: "#f97316", label: "Energetic" }, // Orange
    { color: "#eab308", label: "Happy" }, // Yellow
    { color: "#22c55e", label: "Calm" }, // Green
    { color: "#3b82f6", label: "Sad" }, // Blue
    { color: "#a855f7", label: "Creative" }, // Purple
    { color: "#ec4899", label: "Loving" }, // Pink
    { color: "#71717a", label: "Numb" }, // Gray
];

export default function MoodPicker() {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (idx: number) => {
        setSelected(MOODS[idx].label);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            {!selected ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {MOODS.map((m, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSelect(idx)}
                            className="w-20 h-20 rounded-full shadow-lg"
                            style={{ backgroundColor: m.color }}
                        />
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Valid.
                    </h2>
                    <p className="text-white/60 mb-8">
                        It's okay to feel {selected.toLowerCase()}.
                    </p>
                    <button
                        onClick={() => setSelected(null)}
                        className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                        Reset
                    </button>
                </motion.div>
            )}
        </div>
    );
}
