
export interface LoggerAdapter {
    log: (message: LoggerAdapter.LogMessage) => void;
}

export namespace LoggerAdapter {
    export type LogType = "info" | "error" | "warn";
    export type LogMessage = {
        message: string;
        type: LogType;
    };
}