"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Calculator } from "lucide-react";

export default function FastMath() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [question, setQuestion] = useState({ text: "", answer: 0, options: [] as number[] });

    // Game timer (global)
    useEffect(() => {
        if (state === 'playing') {
            const interval = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 0) {
                        setState('result');
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [state]);

    const generateQuestion = useCallback(() => {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a = 0, b = 0, ans = 0;

        // Make it easy but fast
        if (op === '+') {
            a = Math.floor(Math.random() * 20) + 1;
            b = Math.floor(Math.random() * 20) + 1;
            ans = a + b;
        } else if (op === '-') {
            a = Math.floor(Math.random() * 20) + 10;
            b = Math.floor(Math.random() * 10) + 1;
            ans = a - b;
        } else {
            a = Math.floor(Math.random() * 9) + 2;
            b = Math.floor(Math.random() * 9) + 2;
            ans = a * b;
        }

        // Generate options
        const options = new Set<number>();
        options.add(ans);
        while (options.size < 4) {
            const offset = Math.floor(Math.random() * 10) - 5;
            const fake = ans + offset;
            if (fake !== ans && fake > 0) options.add(fake);
        }

        setQuestion({
            text: `${a} ${op} ${b}`,
            answer: ans,
            options: Array.from(options).sort(() => Math.random() - 0.5)
        });
    }, []);

    const handleStart = () => {
        setState('playing');
        setScore(0);
        setTimeLeft(15); // 15s total time, adds time on correct answer?
        // Let's do constant pressure: 20s total, +1s per correct answer?
        // Or just "Solve as many as possible in 30s"
        setTimeLeft(30);
        generateQuestion();
    };

    const handleAnswer = (val: number) => {
        if (val === question.answer) {
            setScore(s => s + 1);
            generateQuestion();
        } else {
            // Wrong answer - penalty or game over? 
            // Let's do 2s penalty to prevent spamming
            setTimeLeft(t => Math.max(0, t - 3));
            // Visual feedback needed (shake) - skipping for speed
            generateQuestion();
        }
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setState('idle');
    };

    return (
        <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center">
            {state === 'idle' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center cursor-pointer p-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    onClick={handleStart}
                >
                    <Calculator className="mx-auto mb-4 w-12 h-12 text-yellow-400" />
                    <h3 className="text-2xl font-bold mb-2">Start Math</h3>
                    <p className="text-white/60">Solve as many as you can in 30s.</p>
                </motion.div>
            )}

            {state === 'playing' && (
                <div className="w-full max-w-sm flex flex-col gap-6">
                    <div className="flex justify-between items-center px-4 font-mono text-xl">
                        <span className="text-white/50">Score: {score}</span>
                        <span className={timeLeft < 5 ? "text-red-500 animate-pulse" : "text-yellow-400"}>{timeLeft}s</span>
                    </div>

                    <div className="text-center py-8">
                        <h2 className="text-5xl font-bold">{question.text} = ?</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {question.options.map((opt, idx) => (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 hover:bg-white/20 p-6 rounded-2xl text-2xl font-bold transition-colors"
                                onClick={() => handleAnswer(opt)}
                            >
                                {opt}
                            </motion.button>
                        ))}
                    </div>
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
                        <span className="text-xl text-white/50 block font-normal mt-2">problems solved</span>
                    </div>
                    <p className="text-white/80">
                        {score > 20 ? "Human calculator! 🧮" : score > 10 ? "Quick maths! ✨" : "School time? 📚"}
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
