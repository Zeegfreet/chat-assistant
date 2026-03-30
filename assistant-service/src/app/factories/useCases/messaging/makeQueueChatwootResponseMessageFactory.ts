import { QueueChatwootResponseMessage } from "@data/useCases/messaging/queueChatwootResponseMessage";
import { BullMqProducerAdapter } from "@db/messaging/bullmq/bullMqProducerAdapter";

export const makeQueueChatwootResponseMessageFactory = () => {

    const provider = new BullMqProducerAdapter();

    return new QueueChatwootResponseMessage(
        provider
    );
};