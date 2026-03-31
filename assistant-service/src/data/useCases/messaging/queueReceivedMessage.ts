import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindAiAgentBySlugRepository, IMessageQueue } from "@domain/index";
import { IQueueReceivedMessage } from "@domain/useCases/messaging/iQueueReceivedMessage";

export class QueueReceivedMessage implements IQueueReceivedMessage {
    constructor(
        private readonly queueProvider: IMessageQueue,
        private readonly findAgentBySlugRepository: FindAiAgentBySlugRepository
    ){}
    async queue(params: IQueueReceivedMessage.Params): Promise<IQueueReceivedMessage.Result> {
        const targetQueue = "agent-message-received";

        const agent = await this.findAgentBySlugRepository.findBySlug(params.slug);

        if(!agent) throw new NotFoundError("Agent not found.");

        const quequed = await this.queueProvider.add(targetQueue, params);

        return {
            jobId: quequed.jobId,
            status: "enqueued"
        };
    }

}