"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import SubmitScore from "@/components/games/SubmitScore";

export default function ReactionTime() {
    const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
    const [time, setTime] = useState(0);
    const startTime = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleStart = () => {
        setState('waiting');
        const delay = Math.random() * 3000 + 2000; // 2-5s delay

        timeoutRef.current = setTimeout(() => {
            setState('ready');
            startTime.current = Date.now();
        }, delay);
    };

    const handleClick = () => {
        if (state === 'idle') {
            handleStart();
        } else if (state === 'waiting') {
            // Too early
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setState('idle');
            alert("Too early! Wait for green."); // Replace with better UI later
        } else if (state === 'ready') {
            const endTime = Date.now();
            setTime(endTime - startTime.current);
            setState('result');
        }
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setState('idle');
        setTime(0);
    };

    return (
        <div
            className={cn(
                "w-full h-full min-h-[300px] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 select-none p-6 text-center",
                state === 'idle' && "bg-white/5 hover:bg-white/10",
                state === 'waiting' && "bg-red-500/20 animate-pulse",
                state === 'ready' && "bg-green-500",
                state === 'result' && "bg-blue-500/20"
            )}
            onClick={handleClick}
        >
            {state === 'idle' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3 className="text-2xl font-bold mb-2">Tap to Start</h3>
                    <p className="text-white/60">Wait for green, then tap fast.</p>
                </motion.div>
            )}

            {state === 'waiting' && (
                <h3 className="text-2xl font-bold text-red-400">Wait for it...</h3>
            )}

            {state === 'ready' && (
                <h3 className="text-4xl font-bold text-white scale-110">TAP!</h3>
            )}

            {state === 'result' && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="text-5xl font-mono font-bold text-white">
                        {time}
                        <span className="text-2xl text-white/50 ml-1">ms</span>
                    </div>
                    <p className="text-white/80">
                        {time < 200 ? "Godlike! ⚡" : time < 300 ? "Nice reflex! 🔥" : "You can do better. 🐢"}
                    </p>

                    <SubmitScore gameId="reaction-time" score={time} scoreUnit="ms" />

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
