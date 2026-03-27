import { Express } from "express";
import cors from "cors";

const allowedOrigins = [
    "http://localhost:8090",
    "http://localhost:5173",
    "http://localhost:3000",
    "*"
];

export const setupCors = (app: Express) => {
    app.use(
        cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true
        }),
    );
};