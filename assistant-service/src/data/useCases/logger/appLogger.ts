import { LoggerAdapter } from "@data/protocols/loggerAdapter";
import { Logger } from "@domain/index";

export class AppLogger implements Logger{

    constructor(
        private readonly logger: LoggerAdapter
    ){}

    async log(message: Logger.LogMessage): Promise<void> {
        this.logger.log(message);
    }

}