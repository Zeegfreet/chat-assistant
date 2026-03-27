import { Express } from "express";
import pinoHttp from "pino-http";
import { logger } from "./pino-logger";

const loggerHttp = pinoHttp({
    logger
});

export const setupLogger = (app: Express) => {
    
    app.use(
        loggerHttp
    );
};