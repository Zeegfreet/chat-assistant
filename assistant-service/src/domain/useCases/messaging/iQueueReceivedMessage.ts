import { IMessageJobData } from "@domain/protocols/iMessageJobData";

export interface IQueueReceivedMessage {
    queue(params: IQueueReceivedMessage.Params): Promise<IQueueReceivedMessage.Result>
}

export namespace IQueueReceivedMessage {
    export type Params<T = any> = IMessageJobData<T>
    export type Result = {
        jobId: string,
        status: string
    }
}