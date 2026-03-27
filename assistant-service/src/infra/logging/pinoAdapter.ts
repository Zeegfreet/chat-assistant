import { LoggerAdapter } from "@data/protocols/loggerAdapter";
import { logger } from "./pino-logger";

export class PinoAdapter implements LoggerAdapter {

    private get pinoLogger() {
        return logger;
    }

    log(message: LoggerAdapter.LogMessage) {
        this.pinoLogger[message.type](message.message);
    }
}