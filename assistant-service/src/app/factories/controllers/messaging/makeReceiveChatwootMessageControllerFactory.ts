import { makeFindAiAgentBySlugRepositoryFactory } from "@app/factories/repositories/aiagents/makeFindAiAgentBySlugRepositoryFactory";
import { ReceiveChatwootMessage } from "@data/useCases/messaging/receiveChatwootMessage";
import { BullMqProducerAdapter } from "@db/messaging/bullmq/bullMqProducerAdapter";
import { ReceiveChatwootMessageController } from "@presentation/controllers/messaging/receiveChatwootMessageController";

export const makeReceiveChatwootMessageControllerFactory = () => {
    const producer = new BullMqProducerAdapter();
    const findAiAgentBySlugRepository = makeFindAiAgentBySlugRepositoryFactory();
    const messager = new ReceiveChatwootMessage(
        producer,
        findAiAgentBySlugRepository
    );

    return new ReceiveChatwootMessageController(
        messager
    );
};