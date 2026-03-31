import { QueueSendMessage } from "@data/useCases/messaging/queueSendMessage";
import { BullMqProducerAdapter } from "@db/messaging/bullmq/bullMqProducerAdapter";

export const makeQueueChatwootResponseMessageFactory = () => {

    const provider = new BullMqProducerAdapter();

    return new QueueSendMessage(
        provider
    );
};