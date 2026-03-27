import pino from "pino";
import { pinoConfig, pinoTransport } from "./pino-config";

// Esta instância é usada para logs manuais: logger.info("Mensagem")
export const logger = pino(pinoConfig, pinoTransport);