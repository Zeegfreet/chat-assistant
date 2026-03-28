import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindPromptByNameRepository, IAddMessageWithCacheService, IGetChatContextService, IMessageJobData } from "@domain/index";
import { IMessageToAi } from "@domain/protocols/iMessageToAi";
import { IProcessReceivedMesage } from "@domain/useCases/messaging/iProcessReceivedMessage";

export class ProcessChatwootMessage implements IProcessReceivedMesage {
    constructor(
        private readonly ai: IMessageToAi,
        private readonly getPrompt: FindPromptByNameRepository,
        private readonly promptName: string,
        private readonly getChatContextService: IGetChatContextService,
        private readonly addMessageToContext: IAddMessageWithCacheService
    ){}
    async proccess(params: IMessageJobData): Promise<void> {
        const prompt = await this.getPrompt.findByName(this.promptName);
        if(!prompt) throw new NotFoundError("Prompt not found");

        const userMessage = `
            nome: ${params.contactInfo.name}
            mensagem: ${params.messageContent}
        `;

        await this.addMessageToContext.add({
            accountId: params.accountContext.accountId,
            conversationId: params.conversationId,
            role: "user",
            message_type: "incoming",
            content_type: "text",
            text: userMessage,
            content: null,
        });

        const context = await this.getChatContextService.getContext(params.accountContext.accountId, params.conversationId);

        const response = await this.ai.message(prompt.prompt, context);

        await this.addMessageToContext.add({
            accountId: params.accountContext.accountId,
            conversationId: params.conversationId,
            role: "model",
            message_type: "outgoing",
            content_type: "text",
            text: response.message,
            content: null,
        });

        console.log(response);
    }

}