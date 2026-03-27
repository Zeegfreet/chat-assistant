import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindPromptByNameRepository, IMessageJobData } from "@domain/index";
import { IMessageToAi } from "@domain/protocols/iMessageToAi";
import { IProcessReceivedMesage } from "@domain/useCases/messaging/iProcessReceivedMessage";

export class ProcessChatwootMessage implements IProcessReceivedMesage {
    constructor(
        private readonly ai: IMessageToAi,
        private readonly getPrompt: FindPromptByNameRepository,
        private readonly promptName: string,
    ){}
    async proccess(params: IMessageJobData): Promise<void> {
        const prompt = await this.getPrompt.findByName(this.promptName);

        if(!prompt) throw new NotFoundError("Prompt not found");

        const message = `
            nome: ${params.contactInfo.name}
            mensagem: ${params.messageContent}
        `;

        const response = await this.ai.message(prompt.prompt, message);

        console.log(response);
    }

}