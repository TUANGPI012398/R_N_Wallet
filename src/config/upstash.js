import{ Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import "dotenv/config";

const rateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
   limiter: Ratelimit.slidingWindow(3,"60 s"),
});

export default rateLimiter;