"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, CheckCircle2 } from "lucide-react";
import { CHALLENGES } from "@/lib/game-data";

export default function RandomChallenge() {
    const [challenge, setChallenge] = useState<string | null>(null);

    const pickChallenge = () => {
        const random = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        setChallenge(random);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
            {!challenge ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="cursor-pointer p-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    onClick={pickChallenge}
                >
                    <h3 className="text-2xl font-bold mb-2">I need a challenge</h3>
                    <p className="text-white/60">Dare to try?</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col gap-8 items-center"
                >
                    <h2 className="text-3xl font-bold leading-tgight max-w-sm">
                        {challenge}
                    </h2>
                    <div className="flex gap-4">
                        <button
                            onClick={pickChallenge}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors"
                        >
                            <RefreshCcw size={18} /> New One
                        </button>
                        <button
                            onClick={() => setChallenge(null)}
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-colors"
                        >
                            <CheckCircle2 size={18} /> Done
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
