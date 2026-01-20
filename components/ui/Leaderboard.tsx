"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data generator
const MOCK_LEADERBOARD = [
    { name: "SpeedDemon", score: "148ms", rank: 1 },
    { name: "ClickMaster", score: "152ms", rank: 2 },
    { name: "PixelPerfect", score: "165ms", rank: 3 },
    { name: "SlowPoke", score: "190ms", rank: 4 },
    { name: "BoredUser123", score: "210ms", rank: 5 },
];

export default function Leaderboard() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                className="fixed top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md z-40 transition-colors"
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Trophy className="text-yellow-400 w-6 h-6" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-[80vh] bg-[#111] border-t border-white/10 rounded-t-3xl z-50 flex flex-col shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <Trophy className="text-yellow-400 w-6 h-6" />
                                    <h2 className="text-xl font-bold">Global Ranks</h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-2">
                                {/* Game Selector (Mock) */}
                                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                    {['Reaction Time', 'Click Speed', 'Aim Trainer', 'Memory'].map((g, i) => (
                                        <button
                                            key={i}
                                            className={cn(
                                                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                                i === 0 ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                                            )}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>

                                {/* List */}
                                {MOCK_LEADERBOARD.map((entry, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border border-white/5",
                                            entry.rank === 1 ? "bg-yellow-500/10 border-yellow-500/30" : "bg-white/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={cn(
                                                "w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm",
                                                entry.rank === 1 ? "bg-yellow-400 text-black" :
                                                    entry.rank === 2 ? "bg-gray-300 text-black" :
                                                        entry.rank === 3 ? "bg-amber-600 text-white" : "bg-white/10"
                                            )}>
                                                {entry.rank}
                                            </span>
                                            <span className="font-medium">{entry.name}</span>
                                        </div>
                                        <span className="font-mono text-white/60">{entry.score}</span>
                                    </motion.div>
                                ))}

                                <div className="mt-8 p-6 text-center text-white/30 text-sm border-t border-white/5 mx-6">
                                    Sign in to save your scores automatically.
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
