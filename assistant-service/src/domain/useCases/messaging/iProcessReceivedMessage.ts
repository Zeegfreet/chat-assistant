import { IMessageJobData } from "@domain/protocols/iMessageJobData";

export interface IProcessReceivedMesage {
    proccess(params: IMessageJobData): Promise<void>
}

export namespace IproccessReceivedMessage {
    export type Response = {
        status: "success" | "fail"
        messageContent: string
    }
}