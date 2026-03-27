
export interface IMessageQueue {
    add(queueName: IMessageQueue.QueueName, data: IMessageQueue.QueueData): Promise<IMessageQueue.Result>
}

export namespace IMessageQueue {
    export type QueueName = string;
    export type QueueData<T = any> = T

    export type Result = {
        jobId: string;
    }

}