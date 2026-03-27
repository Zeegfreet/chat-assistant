import IORedis from "ioredis";

export const redisConnection = new IORedis({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT || 6379),
    db: Number(process.env.REDIS_DB || 2),
    maxRetriesPerRequest: null
});