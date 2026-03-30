import { IMessageJobData, IMessageQueue } from "@domain/index";
import { IQueueReceivedMessage } from "@domain/useCases/messaging/iQueueReceivedMessage";

export class QueueChatwootResponseMessage implements IQueueReceivedMessage {
    constructor(
        private readonly queueProvider: IMessageQueue
    ){}
    async queue(message: IQueueReceivedMessage.Params<IMessageJobData>): Promise<IQueueReceivedMessage.Result> {
        const targetQueue = "chatwoot-response";

        const quequed = await this.queueProvider.add(targetQueue, message);

        return {
            jobId: quequed.jobId,
            status: "enqueued"
            
        };
    }

}