"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GAMES, Game } from "@/lib/games";
import GameShell from "@/components/games/GameShell";
import ReactionTime from "@/components/games/ReactionTime";
import ClickSpeed from "@/components/games/ClickSpeed";
import AimTrainer from "@/components/games/AimTrainer";
import MemoryFlash from "@/components/games/MemoryFlash";
import FastMath from "@/components/games/FastMath";
import ColorMatch from "@/components/games/ColorMatch";
import RandomChallenge from "@/components/games/RandomChallenge";
import WouldYouRather from "@/components/games/WouldYouRather";
import Compliment from "@/components/games/Compliment";
import ThisOrThat from "@/components/games/ThisOrThat";
import FakeFact from "@/components/games/FakeFact";
import MoodPicker from "@/components/games/MoodPicker";
import Oracle from "@/components/games/Oracle";
import DecisionSpinner from "@/components/games/DecisionSpinner";
import ChaosMeter from "@/components/games/ChaosMeter";

// Map IDs to Components
const GAME_COMPONENTS: Record<string, React.ComponentType<any>> = {
    'reaction-time': ReactionTime,
    'click-speed': ClickSpeed,
    'aim-trainer': AimTrainer,
    'memory-flash': MemoryFlash,
    'fast-math': FastMath,
    'color-match': ColorMatch,
    'random-challenge': RandomChallenge,
    'would-you-rather': WouldYouRather,
    'compliment': Compliment,
    'this-or-that': ThisOrThat,
    'fake-fact': FakeFact,
    'mood-picker': MoodPicker,
    'oracle': Oracle,
    'decision-spinner': DecisionSpinner,
    'chaos-meter': ChaosMeter,
};

export default function Home() {
    const [activeGame, setActiveGame] = useState<Game | null>(null);

    const handleStart = () => {
        // Only pick games we have components for
        const availableGames = GAMES.filter(g => GAME_COMPONENTS[g.id]);
        const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)];
        setActiveGame(randomGame);
    };

    const handleExit = () => {
        setActiveGame(null);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto min-h-[80vh]">
            <AnimatePresence mode="wait">
                {!activeGame ? (
                    <motion.div
                        key="home"
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <motion.button
                            layoutId="main-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStart}
                            className="group relative px-12 py-12 md:px-16 md:py-16 bg-white text-black rounded-full font-bold text-2xl md:text-4xl tracking-tight shadow-[0_0_80px_-20px_rgba(255,255,255,0.4)] transition-all z-10"
                        >
                            <span className="relative z-10">I'm bored</span>
                            <div className="absolute inset-0 rounded-full bg-white opacity-40 blur-xl group-hover:opacity-60 transition-opacity animate-pulse-slow" />
                            <div className="absolute -inset-4 rounded-full border border-white/20 scale-100 group-hover:scale-110 transition-transform duration-700" />
                        </motion.button>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            className="text-sm font-medium tracking-widest uppercase text-white/40"
                        >
                            The Cure for Boredom
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="game-container"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full"
                    >
                        {(() => {
                            const Component = GAME_COMPONENTS[activeGame.id] || (() => <div className="text-center p-10">Coming Soon</div>);
                            return (
                                <GameShell
                                    title={activeGame.title}
                                    description={activeGame.description}
                                    color={activeGame.color}
                                    onExit={handleExit}
                                >
                                    <Component />
                                </GameShell>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
