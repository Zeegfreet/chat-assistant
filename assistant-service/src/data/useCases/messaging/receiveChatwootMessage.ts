import { IMessageJobData, IMessageQueue } from "@domain/index";
import { IChatwootReceivedMessage } from "@domain/models/IChatwootReceivedMessage";
import { IQueueReceivedMessage } from "@domain/useCases/messaging/iQueueReceivedMessage";

export class ReceiveChatwootMessage implements IQueueReceivedMessage {
    constructor(
        private readonly queueProvider: IMessageQueue
    ){}
    async queue(params: IQueueReceivedMessage.Params<IChatwootReceivedMessage>): Promise<IQueueReceivedMessage.Result> {
        const targetQueue = "chatwoot-pimpao";

        const message: IMessageJobData = {
            conversationId: String(params.conversation.id),
            contactId: String(params.sender.id),
            messageContent: params.content,
            accountContext: {
                accountId: String(params.account.id),
                inboxId: String(params.inbox.id),
            },
            contactInfo: {
                name: params.sender.name,
                email: params.sender.email,
                phone: params.sender.phone_number,
            }
        };

        const quequed = await this.queueProvider.add(targetQueue, message);

        return {
            jobId: quequed.jobId,
            status: "enqueued"
        };
    }

}