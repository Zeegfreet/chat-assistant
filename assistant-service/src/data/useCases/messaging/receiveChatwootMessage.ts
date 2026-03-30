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
            accountId: String(params.account.id),
            conversationId: String(params.conversation.id),
            contactId: String(params.sender.id),
            role: "user",
            message_type: "text",
            text: params.content,
            message_content: {
                inboxId: String(params.inbox.id),
                contactInfo: {
                    name: params.sender.name,
                    email: params.sender.email,
                    phone: params.sender.phone_number,
                }
            }
        };

        const quequed = await this.queueProvider.add(targetQueue, message);

        return {
            jobId: quequed.jobId,
            status: "enqueued"
        };
    }

}