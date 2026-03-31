import { makeFindAiAgentBySlugRepositoryFactory } from "@app/factories/repositories/aiagents/makeFindAiAgentBySlugRepositoryFactory";
import { QueueReceivedMessage } from "@data/useCases/messaging/queueReceivedMessage";
import { BullMqProducerAdapter } from "@db/messaging/bullmq/bullMqProducerAdapter";
import { QueueReceivedChatwootMessageController } from "@presentation/controllers/messaging/queueReceivedChatwootMessageController";

export const makeQueueReceivedChatwootMessageControllerFactory = () => {
    const producer = new BullMqProducerAdapter();
    const findAiAgentBySlugRepository = makeFindAiAgentBySlugRepositoryFactory();
    const messager = new QueueReceivedMessage(
        producer,
        findAiAgentBySlugRepository
    );

    return new QueueReceivedChatwootMessageController(
        messager
    );
};