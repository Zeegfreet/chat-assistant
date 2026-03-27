
export interface Logger {
    log(message: Logger.LogMessage): Promise<void>;
}

export namespace Logger {
    export type LogType = "info" | "error" | "warn";
    export type LogMessage = {
        message: string;
        type: LogType;
    };
}