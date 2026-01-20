"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GameShellProps {
    title: string;
    description: string;
    color: string;
    onExit: () => void;
    children: React.ReactNode;
}

export default function GameShell({ title, description, color, onExit, children }: GameShellProps) {
    const [showGame, setShowGame] = useState(false);

    // Intro sequence: Title -> Description -> Game
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGame(true);
        }, 1500); // 1.5s intro
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-5xl mx-auto min-h-[600px] flex flex-col md:flex-row gap-8 p-4 md:p-8"
        >
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onExit}
                className="absolute top-4 left-4 md:top-0 md:left-0 md:relative md:w-12 md:h-12 flex items-center justify-center rounded-full glass-button z-50 text-white/70 hover:text-white"
            >
                <ArrowLeft size={24} />
            </motion.button>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative">
                <AnimatePresence mode="wait">
                    {!showGame ? (
                        <motion.div
                            key="intro"
                            className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 glass-panel rounded-3xl p-12"
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-3xl opacity-20 blur-3xl -z-10"
                                animate={{ backgroundColor: color }}
                                transition={{ duration: 1 }}
                            />

                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40"
                                style={{ textShadow: `0 0 50px ${color}60` }}
                            >
                                {title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-white/60 font-medium max-w-xl"
                            >
                                {description}
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="game"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            className="w-full h-full glass-panel rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden"
                            style={{ boxShadow: `0 0 100px -20px ${color}20` }}
                        >
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
                                style={{ backgroundColor: color }} />
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
