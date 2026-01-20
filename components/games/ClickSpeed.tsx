"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClickSpeed() {
    const [state, setState] = useState<'idle' | 'running' | 'result'>('idle');
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5.0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (state === 'running') {
            const startTime = Date.now();
            intervalRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                const newTime = Math.max(0, 5.0 - elapsed);
                setTimeLeft(newTime);
                if (newTime <= 0) {
                    finishGame();
                }
            }, 50);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [state]);

    const finishGame = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setState('result');
        setTimeLeft(0);
    };

    const handleClick = () => {
        if (state === 'idle') {
            setState('running');
            setClicks(1);
        } else if (state === 'running') {
            setClicks(c => c + 1);
        }
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setState('idle');
        setClicks(0);
        setTimeLeft(5.0);
    };

    return (
        <div
            className="w-full h-full min-h-[300px] flex flex-col items-center justify-center select-none"
            onClick={handleClick}
        >
            {state === 'idle' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center cursor-pointer p-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                    <MousePointer2 className="mx-auto mb-4 w-12 h-12 text-blue-400" />
                    <h3 className="text-2xl font-bold mb-2">Tap to Start</h3>
                    <p className="text-white/60">Click as fast as you can in 5s.</p>
                </motion.div>
            )}

            {state === 'running' && (
                <div className="text-center w-full h-full flex flex-col items-center justify-center cursor-crosshair">
                    <div className="text-8xl font-bold text-white scale-110 active:scale-95 transition-transform duration-75">
                        {clicks}
                    </div>
                    <div className="mt-8 text-2xl font-mono text-blue-400">
                        {timeLeft.toFixed(2)}s
                    </div>
                </div>
            )}

            {state === 'result' && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4 text-center cursor-default"
                >
                    <div className="text-6xl font-black text-white">
                        {clicks}
                        <span className="text-xl text-white/50 block font-normal mt-2">clicks / 5s</span>
                    </div>
                    <div className="text-xl text-blue-300">
                        {(clicks / 5).toFixed(1)} CPS
                    </div>
                    <p className="text-white/80 max-w-xs mx-auto">
                        {clicks > 50 ? "Are you a robot? 🤖" : clicks > 35 ? "Speed demon! ⚡" : "Keep practicing! 💪"}
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
