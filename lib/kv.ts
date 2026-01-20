import { kv } from "@vercel/kv";

export const getKV = () => {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        console.warn("Vercel KV environment variables missing. Using mock mode.");
        return null;
    }
    return kv;
};
