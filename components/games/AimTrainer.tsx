"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

interface Target {
    id: number;
    x: number;
    y: number;
}

export default function AimTrainer() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [targetsHit, setTargetsHit] = useState(0);
    const [currentTarget, setCurrentTarget] = useState<Target | null>(null);
    const [startTime, setStartTime] = useState(0);
    const [finalTime, setFinalTime] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const TOTAL_TARGETS = 15;

    const spawnTarget = () => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Padding of 40px to keep inside
        const x = Math.random() * (width - 80) + 40;
        const y = Math.random() * (height - 80) + 40;
        setCurrentTarget({ id: Date.now(), x, y });
    };

    const startGame = () => {
        setState('playing');
        setTargetsHit(0);
        setStartTime(Date.now());
        spawnTarget();
    };

    const handleHit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (state !== 'playing') return;

        if (targetsHit + 1 >= TOTAL_TARGETS) {
            setFinalTime(Date.now() - startTime);
            setState('result');
            setCurrentTarget(null);
        } else {
            setTargetsHit(h => h + 1);
            spawnTarget();
        }
    };

    const reset = () => {
        setState('idle');
        setTargetsHit(0);
        setFinalTime(0);
    };

    // Adjust target position on resize? Not critical for now.

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[400px] relative bg-white/5 rounded-3xl overflow-hidden cursor-crosshair border border-white/5"
        >
            {state === 'idle' && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors z-10"
                    onClick={startGame}
                >
                    <Crosshair className="w-12 h-12 text-rose-500 mb-4" />
                    <h3 className="text-2xl font-bold">Start Aim Training</h3>
                    <p className="text-white/60">Hit {TOTAL_TARGETS} targets as fast as possible.</p>
                </div>
            )}

            {state === 'playing' && (
                <>
                    <div className="absolute top-4 left-4 text-sm font-mono text-white/50 pointer-events-none">
                        {targetsHit} / {TOTAL_TARGETS}
                    </div>
                    <AnimatePresence mode="popLayout">
                        {currentTarget && (
                            <motion.button
                                key={currentTarget.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                style={{
                                    left: currentTarget.x,
                                    top: currentTarget.y,
                                    position: 'absolute',
                                    transform: 'translate(-50%, -50%)'
                                }}
                                className="w-12 h-12 rounded-full bg-rose-500 border-4 border-white shadow-[0_0_20px_rgba(244,63,94,0.6)]"
                                onMouseDown={handleHit}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}

            {state === 'result' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-sm cursor-default">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <div className="text-5xl font-mono font-bold text-white mb-2">
                            {(finalTime / 1000).toFixed(2)}s
                        </div>
                        <div className="text-rose-400 text-lg mb-6">
                            Average: {(finalTime / TOTAL_TARGETS).toFixed(0)}ms / target
                        </div>
                        <button
                            onClick={reset}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform mx-auto"
                        >
                            <RefreshCcw size={18} /> Try Again
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
