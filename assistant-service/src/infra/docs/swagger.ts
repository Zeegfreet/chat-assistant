import SwaggerParser from "@apidevtools/swagger-parser";
import chalk from "chalk";
import { Express } from "express";
import path from "node:path";
import swaggerUi from "swagger-ui-express";

export const setupSwagger = async (app: Express) => {
    if (process.env.NODE_ENV != "development") return;
    console.log(chalk.yellowBright("[SWAGGER]"), "Instanced up in development mode...");
    const swaggerPath = path.resolve(__dirname, "openapi.yaml");

    const swaggerDocument = await SwaggerParser.bundle(swaggerPath);

    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            swaggerOptions: {
                withCredentials: true,
                requestInterceptor: (req: any) => {
                    req.credentials = "include";
                    return req;
                },
            }
        })
    );
};