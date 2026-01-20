"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FAKE_FACTS } from "@/lib/game-data";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FakeFact() {
    const [batchIndex, setBatchIndex] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [statements, setStatements] = useState<{ text: string, isReal: boolean }[]>([]);

    // Load statements for current batch
    useState(() => {
        loadBatch(0);
    });

    function loadBatch(idx: number) {
        if (!FAKE_FACTS[idx]) return;

        const batch = FAKE_FACTS[idx];
        const all = [
            ...batch.true.map(t => ({ text: t, isReal: true })),
            { text: batch.fake, isReal: false }
        ];
        // Shuffle
        setStatements(all.sort(() => Math.random() - 0.5));
        setSelected(null);
    }

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);

        setTimeout(() => {
            const nextIdx = (batchIndex + 1) % FAKE_FACTS.length;
            setBatchIndex(nextIdx);
            loadBatch(nextIdx);
        }, 2500);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
            <h3 className="text-xl text-white/60 mb-4">Tap the <span className="text-red-400 font-bold">LIE</span></h3>

            <div className="flex flex-col gap-3 w-full max-w-sm">
                {statements.map((stmt, idx) => {
                    const isSelected = selected === idx;
                    const reveal = selected !== null;

                    let statusColor = "bg-white/5 border-white/5 hover:bg-white/10";
                    if (reveal) {
                        if (!stmt.isReal) statusColor = "bg-green-500/20 border-green-500"; // Found the lie (correct)
                        else if (isSelected && stmt.isReal) statusColor = "bg-red-500/20 border-red-500"; // Picked truth (wrong)
                        else statusColor = "opacity-50";
                    }

                    return (
                        <motion.button
                            key={idx}
                            layout
                            onClick={() => handleSelect(idx)}
                            className={cn(
                                "relative p-6 rounded-2xl text-left border transition-all duration-300",
                                statusColor
                            )}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-lg font-medium">{stmt.text}</span>
                            {reveal && !stmt.isReal && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                    LIE <CheckCircle2 size={16} />
                                </div>
                            )}
                            {reveal && isSelected && stmt.isReal && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                    TRUE <XCircle size={16} />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
