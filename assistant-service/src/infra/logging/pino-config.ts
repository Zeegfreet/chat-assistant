import pino, { LoggerOptions } from "pino";
import path from "path";

const isTest = process.env.NODE_ENV === "test";
const isProduction = process.env.NODE_ENV === "production";

export const pinoConfig: LoggerOptions = {
    timestamp: pino.stdTimeFunctions.isoTime,
    level: isProduction ? "info" : "warn",
    enabled: !isTest,
    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "req.headers['set-cookie']",
            "res.headers['set-cookie']",
            "password",
            "token"
        ],
        censor: "***CENSORED***" // Opcional: o que aparece no lugar
    }
};

export const pinoTransport = isTest ? undefined : pino.transport({
    targets: [
        {
            target: "pino-pretty",
            level: "debug",
            options: { colorize: true }
        },
        {
            target: "pino/file",
            level: "info",
            options: { 
                destination: path.resolve(process.cwd(), "logs/pino.log"),
                mkdir: true // Tenta criar a pasta logs se não existir
            }
        }
    ]
});