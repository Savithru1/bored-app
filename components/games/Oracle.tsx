"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Star } from "lucide-react";

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
        }, 2000); // Slightly longer for anticipation
    };

    const reset = () => {
        setQuestion("");
        setAnswer(null);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative z-10">
            <AnimatePresence mode="wait">
                {!answer && !asking ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        onSubmit={ask}
                        className="w-full max-w-lg flex flex-col gap-8 items-center"
                    >
                        <div className="relative">
                            <h3 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
                                Ask the Oracle
                            </h3>
                            <Sparkles className="absolute -top-6 -right-8 text-cyan-400 w-6 h-6 animate-pulse" />
                        </div>

                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="What does the future hold?"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-xl md:text-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 shadow-inner"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 blur-xl" />
                        </div>

                        <button
                            type="submit"
                            disabled={!question.trim()}
                            className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-lg tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:to-white transition-all">
                                Reveal Fate
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </button>
                    </motion.form>
                ) : asking ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="relative w-32 h-32">
                            <motion.div
                                className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-cyan-500 border-b-purple-500/20 border-l-cyan-500/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full border-4 border-t-cyan-500 border-r-purple-500 border-b-cyan-500/20 border-l-purple-500/20"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full animate-ping" />
                            </div>
                        </div>
                        <p className="text-white/60 text-xl font-light tracking-widest uppercase animate-pulse">Consulting the voids...</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="flex flex-col items-center gap-8 max-w-2xl"
                    >
                        <div className="text-white/40 italic text-lg border-b border-white/10 pb-4 px-8">"{question}"</div>

                        <div className="relative">
                            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-purple-200 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                {answer}
                            </h2>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -top-8 -right-8 text-yellow-300"
                            >
                                <Star className="w-8 h-8 fill-current animate-spin-slow" />
                            </motion.div>
                        </div>

                        <button
                            onClick={reset}
                            className="text-white/40 hover:text-white transition-colors mt-12 text-sm uppercase tracking-widest hover:tracking-[0.2em] duration-300"
                        >
                            Ask another question
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
