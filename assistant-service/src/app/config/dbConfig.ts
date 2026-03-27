import { DataSourceOptions } from "typeorm";
import "dotenv/config";
import { SeederOptions } from "typeorm-extension";

export const dbConfig = ((): DataSourceOptions & SeederOptions => {
    switch(process.env.NODE_ENV){
    case "production":
        return {
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ["dist/entitys/**/*.entity.js"],
            migrations: ["dist/infra/db/migrations/*.js"],
            seeds: ["dist/infra/db/seeds/**/*.js"],
            
        };

    case "test":
        return {
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            synchronize: true,
            entities: ["src/entitys/**/*.entity.ts"],
            seeds: ["src/infra/db/seeds/**/*.ts"],
        };
    default:
        return {
            type: "postgres",
            host: process.env.DEV_DB_HOST || "localhost",
            port: Number(process.env.DEV_DB_PORT || 5432),
            username: process.env.DEV_DB_USER || "admin",
            password: process.env.DEV_DB_PASSWORD || "admin",
            database: process.env.DEV_DB_NAME || "dev",
            synchronize: true,
            entities: ["src/entitys/**/*.entity.ts"],
            migrations: ["src/infra/db/migrations/*.ts"],
            seeds: ["src/infra/db/seeds/**/*.ts"]
            
        };
    }
});