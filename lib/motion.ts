import { Variants } from "framer-motion";

export const EASE = [0.4, 0.0, 0.2, 1]; // Standard ease-in-out
export const EASE_SPRING = { type: "spring", stiffness: 300, damping: 30 };

export const FADE_IN: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE }
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.3, ease: EASE }
    }
};

export const STAGGER_CONTAINER: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};
