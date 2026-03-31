import { QueueSendChatwootMessage } from "@data/useCases/chatwoot/queueSendChatwootMessage";
import { BullMqProducerAdapter } from "@db/messaging/bullmq/bullMqProducerAdapter";

export const makeQueueSendChatwootMessageFactory = () => {
    const provider = new BullMqProducerAdapter();
    return new QueueSendChatwootMessage (
        provider
    );
};