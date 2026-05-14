import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Only create ratelimiter if Redis env vars exist to prevent crashing on unconfigured environments
export const ratelimit =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? new Ratelimit({
              redis: new Redis({
                  url: process.env.UPSTASH_REDIS_REST_URL,
                  token: process.env.UPSTASH_REDIS_REST_TOKEN,
              }),
              limiter: Ratelimit.slidingWindow(20, "10 s"), // Max 20 requests per 10 seconds per IP
              analytics: true,
          })
        : null;
