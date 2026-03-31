import { ReceiveChatwootMessage } from "@data/useCases/messaging/receiveChatwootMessage";
import { TypeOrmFindAiAgentBySlugRepository } from "@db/db/repositories";
import { BullMqProducerAdapter } from "@db/messaging/bullmq/bullMqProducerAdapter";
import { ReceiveChatwootMessageController } from "@presentation/controllers/messaging/receiveChatwootMessageController";

export const makeReceiveChatwootMessageControllerFactory = () => {
    const producer = new BullMqProducerAdapter();
    const findAiAgentBySlugRepository = new TypeOrmFindAiAgentBySlugRepository();
    const messager = new ReceiveChatwootMessage(
        producer,
        findAiAgentBySlugRepository
    );

    return new ReceiveChatwootMessageController(
        messager
    );
};