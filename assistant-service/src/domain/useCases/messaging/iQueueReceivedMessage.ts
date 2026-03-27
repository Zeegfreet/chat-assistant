
export interface IQueueReceivedMessage {
    queue(params: IQueueReceivedMessage.Params): Promise<IQueueReceivedMessage.Result>
}

export namespace IQueueReceivedMessage {
    export type Params<T  = any> = T
    export type Result = {
        jobId: string,
        status: string
    }
}