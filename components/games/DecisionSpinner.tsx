"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, RotateCw } from "lucide-react";

export default function DecisionSpinner() {
    const [options, setOptions] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [spinning, setSpinning] = useState(false);

    const addOption = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && options.length < 6) {
            setOptions([...options, input.trim()]);
            setInput("");
        }
    };

    const removeOption = (idx: number) => {
        setOptions(options.filter((_, i) => i !== idx));
    };

    const spin = () => {
        if (options.length < 2) return;
        setSpinning(true);
        setResult(null);

        // Fake spin time
        setTimeout(() => {
            const winner = options[Math.floor(Math.random() * options.length)];
            setResult(winner);
            setSpinning(false);
        }, 2000);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-4 gap-6">

            {/* Input Stage */}
            {!spinning && !result && (
                <div className="w-full max-w-sm flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-center">What are the options?</h3>
                    <form onSubmit={addOption} className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add option..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || options.length >= 6}
                            className="bg-white/10 p-2 rounded-lg hover:bg-white/20 disabled:opacity-50"
                        >
                            <Plus />
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {options.map((opt, idx) => (
                            <motion.div
                                layout
                                key={idx}
                                className="bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                            >
                                {opt}
                                <button onClick={() => removeOption(idx)} className="hover:text-red-400"><X size={14} /></button>
                            </motion.div>
                        ))}
                    </div>

                    {options.length >= 2 && (
                        <motion.button
                            layout
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={spin}
                            className="mt-4 bg-amber-500 text-black font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20"
                        >
                            Spin the Wheel
                        </motion.button>
                    )}
                </div>
            )}

            {/* Spinning Stage */}
            {spinning && (
                <div className="flex flex-col items-center justify-center flex-1">
                    <RotateCw className="w-24 h-24 text-amber-500 animate-spin" style={{ animationDuration: '0.5s' }} />
                    <p className="mt-8 text-xl font-bold animate-pulse">Deciding...</p>
                </div>
            )}

            {/* Result Stage */}
            {result && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center flex-1 text-center gap-6"
                >
                    <p className="text-white/50">The universe chose:</p>
                    <h2 className="text-5xl font-black text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                        {result}
                    </h2>
                    <button
                        onClick={() => setResult(null)}
                        className="mt-8 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                        Spin Again
                    </button>
                </motion.div>
            )}

        </div>
    );
}
