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
                <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                    <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
                    <Leaderboard />
                    {children}
                </main>
            </body>
        </html>
    );
}
