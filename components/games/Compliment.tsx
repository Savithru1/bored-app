"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { COMPLIMENTS } from "@/lib/game-data";

export default function Compliment() {
    const [compliment, setCompliment] = useState<string | null>(null);

    const giveLove = () => {
        setCompliment(null);
        setTimeout(() => {
            const random = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
            setCompliment(random);
        }, 200);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
            {!compliment ? (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer p-10 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-colors border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.3)]"
                    onClick={giveLove}
                >
                    <Heart className="mx-auto mb-4 w-12 h-12 text-pink-400" />
                    <h3 className="text-2xl font-bold text-pink-100">Boost Me</h3>
                </motion.button>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key="compliment"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="flex flex-col gap-8 items-center"
                    >
                        <Sparkles className="text-yellow-400 w-10 h-10 animate-spin-slow" />
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-md bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                            {compliment}
                        </h2>
                        <button
                            onClick={giveLove}
                            className="mt-8 px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                        >
                            Another one?
                        </button>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
