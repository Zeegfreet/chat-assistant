import { RedisClientOptions } from "redis";

export const redisConfig = ((): RedisClientOptions  => {
    switch (process.env.NODE_ENV) {
    case "production":
        return {
            url: process.env.REDIS_URI
        };
    case "test":
        return {
            url: process.env.REDIS_URI + "/1"
        };
    default:
        return {
            url: process.env.REDIS_URI || "redis://localhost:6379/2"
        };
    }
});