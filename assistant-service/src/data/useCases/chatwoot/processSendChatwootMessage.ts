import { SendChatwootMessageRepository } from "@domain/index";
import { SendChatwootMessage } from "@domain/useCases/chatwoot/sendChatwootMessage";

export class ProcessSendChatwootMessage implements SendChatwootMessage {
    constructor(
        private readonly sendChatwootMessageRepository: SendChatwootMessageRepository
    ){}
    async send(params: SendChatwootMessage.Params): Promise<void> {
        
        await this.sendChatwootMessageRepository.send(params);
    }

}