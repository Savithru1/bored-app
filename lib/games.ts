export type GameType = 'competitive' | 'casual';

export interface Game {
    id: string;
    title: string;
    description: string;
    type: GameType;
    color: string;
    component?: React.ComponentType<any>; // Will be populated as we build them
}

export const GAMES: Game[] = [
    // Competitive
    { id: 'reaction-time', title: 'Reaction Time', description: 'Tap when green.', type: 'competitive', color: '#10b981' },
    { id: 'click-speed', title: 'Click Speed', description: 'Tap fast. Don\'t stop.', type: 'competitive', color: '#3b82f6' },
    { id: 'aim-trainer', title: 'Aim Trainer', description: 'Hit the targets.', type: 'competitive', color: '#f43f5e' },
    { id: 'memory-flash', title: 'Memory Flash', description: 'Repeat the pattern.', type: 'competitive', color: '#8b5cf6' },
    { id: 'fast-math', title: 'Fast Math', description: 'Solve. Quickly.', type: 'competitive', color: '#eab308' },
    { id: 'color-match', title: 'Color Match', description: 'Matches? Yes or No.', type: 'competitive', color: '#ec4899' },

    // Casual
    { id: 'random-challenge', title: 'Challenge', description: 'Do something new.', type: 'casual', color: '#f97316' },
    { id: 'would-you-rather', title: 'Would You Rather', description: 'The hardest choices.', type: 'casual', color: '#6366f1' },
    { id: 'this-or-that', title: 'This or That', description: 'Trust your gut.', type: 'casual', color: '#14b8a6' },
    { id: 'fake-fact', title: 'Real or Fake?', description: 'Spot the lie.', type: 'casual', color: '#84cc16' },
    { id: 'mood-picker', title: 'Mood Picker', description: 'How are you feeling?', type: 'casual', color: '#a855f7' },
    { id: 'oracle', title: 'The Oracle', description: 'Ask the universe.', type: 'casual', color: '#06b6d4' },
    { id: 'decision-spinner', title: 'Decider', description: 'Let fate decide.', type: 'casual', color: '#f59e0b' },
    { id: 'chaos-meter', title: 'Chaos Meter', description: 'Today\'s chaos level.', type: 'casual', color: '#ef4444' },
    { id: 'compliment', title: 'Boost', description: 'You deserve this.', type: 'casual', color: '#fb7185' },
];
