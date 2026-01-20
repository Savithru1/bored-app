import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Leaderboard from "@/components/ui/Leaderboard";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "BORED? | The Cure for Boredom",
    description: "A collection of 15 aesthetic mini-games to kill time.",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.variable, "font-sans min-h-screen bg-background text-foreground antialiased selection:bg-purple-500/30")}>
                <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden p-4">
                    <Leaderboard />
                    {children}
                </main>
            </body>
        </html>
    );
}
