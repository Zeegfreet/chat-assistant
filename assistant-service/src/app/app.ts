import express, { Express } from "express";
import setupRouter from "./routes";
import { setupSwagger } from "../infra/docs/swagger";
import { setupCors } from "./cors/appCors";
import cookieParser from "cookie-parser";
import { expressErrorHandler } from "./middlewares/expressErrorHandler";
import { setupLogger } from "@db/logging/pino-http";
import setup404 from "./middlewares/404";
import { expressHttpLogger } from "./middlewares/expressHttpLogger";
import { setupWorkers } from "./workers/bullmq";

export const createApp = async (): Promise<Express> => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.set("query parser", "extended");
    setupCors(app);
    setupWorkers();
    
    // AGUARDA o swagger carregar todos os YAMLs antes de prosseguir
    await setupSwagger(app); 
    
    setupLogger(app);
    setupRouter(app);
    
    // Agora o 404 só será registrado DEPOIS que o Swagger já estiver na pilha
    setup404(app); 
    
    expressHttpLogger(app);
    // O Error Handler sempre por último
    expressErrorHandler(app);

    return app;
};