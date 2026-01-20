import { getKV } from "@/lib/kv";
import { GAMES } from "@/lib/games";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("game");

    if (!gameId) {
        return NextResponse.json({ error: "Missing gameId" }, { status: 400 });
    }

    const kv = getKV();
    if (!kv) {
        // Return mock data if KV not connected
        return NextResponse.json([
            { member: "MockUser1", score: 100, rank: 1 },
            { member: "MockUser2", score: 90, rank: 2 },
            { member: "MockUser3", score: 80, rank: 3 },
        ]);
    }

    const game = GAMES.find(g => g.id === gameId);
    if (!game) return NextResponse.json({ error: "Invalid game" }, { status: 400 });

    // Determine sort direction
    // Redis Sorted Sets are ascending by default.
    // If 'desc' (Higher is better), we need ZREVRANGE.
    // If 'asc' (Lower is better), we need ZRANGE.

    try {
        let rawScores;
        // We store { score, member: nickname }

        if (game.sortOrder === 'asc') {
            // Lower is better (Time) -> ZRANGE 0 9 WITHSCORES
            rawScores = await kv.zrange(`leaderboard:${gameId}`, 0, 9, { withScores: true });
        } else {
            // Higher is better (Points) -> ZREVRANGE 0 9 WITHSCORES
            // @ts-ignore - kv types might be missing zrevrange specific overload sometimes or strictness
            rawScores = await kv.zrange(`leaderboard:${gameId}`, 0, 9, { rev: true, withScores: true });
        }

        // rawScores comes as [member1, score1, member2, score2, ...]
        const formatted = [];
        for (let i = 0; i < rawScores.length; i += 2) {
            formatted.push({
                member: rawScores[i] as string,
                score: rawScores[i + 1] as number,
                rank: (i / 2) + 1
            });
        }

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("KV Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { gameId, nickname, score } = body;

    if (!gameId || !nickname || score === undefined) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const kv = getKV();
    if (!kv) {
        return NextResponse.json({ success: true, mock: true });
    }

    try {
        // Add to sorted set
        // ZADD headerboard:gameId score nickname
        await kv.zadd(`leaderboard:${gameId}`, { score, member: nickname });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("KV Error:", error);
        return NextResponse.json({ error: "Failed to save score" }, { status: 500 });
    }
}
