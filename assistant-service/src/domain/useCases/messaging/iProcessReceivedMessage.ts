import { IMessageJobData } from "@domain/protocols/iMessageJobData";

export interface IProcessReceivedMesage {
    proccess(params: IMessageJobData): Promise<IProcessReceivedMesage.Result>
}

export namespace IProcessReceivedMesage {
    export type Result = {
        action: "answer" | "transfer" | "annotate",
        message: string
    }
}