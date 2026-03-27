import { ReceiveChatwootMessage } from "@data/useCases/messaging/receiveChatwootMessage";
import { BullMqProducerAdapter } from "@db/messaging/bullmq/bullMqProducerAdapter";
import { ReceiveChatwootMessageController } from "@presentation/controllers/messaging/receiveChatwootMessageController";

export const makeReceiveChatwootMessageControllerFactory = () => {
    const producer = new BullMqProducerAdapter();
    const messager = new ReceiveChatwootMessage(
        producer
    );

    return new ReceiveChatwootMessageController(
        messager
    );
};