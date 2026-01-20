"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Check } from "lucide-react";

interface SubmitScoreProps {
    gameId: string;
    score: number;
    scoreUnit?: string;
    onSubmitted?: () => void;
}

export default function SubmitScore({ gameId, score, scoreUnit, onSubmitted }: SubmitScoreProps) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Load name from localStorage on mount
    useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('bored_username');
            if (saved) setName(saved);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setStatus('submitting');

        // Save locally
        localStorage.setItem('bored_username', name);

        try {
            const res = await fetch('/api/leaderboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gameId, nickname: name, score })
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    if (onSubmitted) onSubmitted();
                }, 1000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-green-400 font-bold bg-green-400/10 px-6 py-3 rounded-full"
            >
                <Check size={18} /> Score Saved!
            </motion.div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="flex gap-2 mt-6 w-full max-w-xs"
        >
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                maxLength={12}
                className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 text-sm focus:outline-none focus:border-white/30"
                disabled={status === 'submitting'}
            />
            <button
                type="submit"
                disabled={!name.trim() || status === 'submitting'}
                className="bg-white text-black p-3 rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all font-bold"
            >
                {status === 'submitting' ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Save size={18} />}
            </button>
        </motion.form>
    );
}
