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
        <div className="relative w-full max-w-md mx-auto aspect-[9/16] max-h-[80vh] flex flex-col">
            {/* Background Gradient */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-20 blur-3xl -z-10"
                animate={{ backgroundColor: color }}
                transition={{ duration: 1 }}
            />

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={onExit}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 text-white"
            >
                <ArrowLeft size={24} />
            </motion.button>

            <div className="flex-1 flex flex-col items-center justify-center relative p-6">
                <AnimatePresence mode="wait">
                    {!showGame ? (
                        <motion.div
                            key="intro"
                            className="text-center space-y-4"
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60"
                                style={{ textShadow: `0 0 30px ${color}40` }}
                            >
                                {title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-white/80 font-medium"
                            >
                                {description}
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="game"
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            className="w-full h-full flex flex-col items-center justify-center"
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
