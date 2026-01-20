"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const ANSWERS = [
    "Yes.", "No.", "Absolutely.", "Not a chance.", "Maybe someday.", "Ask again later.",
    "The stars say yes.", "Don't count on it.", "It is certain.", "Very doubtful."
];

export default function Oracle() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState<string | null>(null);
    const [asking, setAsking] = useState(false);

    const ask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setAsking(true);
        setAnswer(null);

        setTimeout(() => {
            const random = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
            setAnswer(random);
            setAsking(false);
        }, 1500);
    };

    const reset = () => {
        setQuestion("");
        setAnswer(null);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <AnimatePresence mode="wait">
                {!answer && !asking ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={ask}
                        className="w-full max-w-sm flex flex-col gap-6"
                    >
                        <h3 className="text-2xl font-bold">Ask the Oracle</h3>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Will I win the lottery?"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-center text-lg focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!question.trim()}
                            className="bg-cyan-500 text-black font-bold py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                        >
                            Reveal Fate
                        </button>
                    </motion.form>
                ) : asking ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Sparkles className="w-16 h-16 text-cyan-400 animate-spin-slow" />
                        <p className="text-white/60 text-lg animate-pulse">Consulting the voids...</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="text-white/40 italic">"{question}"</div>
                        <h2 className="text-4xl md:text-5xl font-black text-cyan-100 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            {answer}
                        </h2>
                        <button
                            onClick={reset}
                            className="text-white/50 hover:text-white transition-colors mt-8"
                        >
                            Ask another question
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
