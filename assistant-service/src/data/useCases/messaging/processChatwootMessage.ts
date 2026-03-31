import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindAiAgentBySlugRepository, IAddMessageWithCacheService, IGetChatContextService, IMessageJobData } from "@domain/index";
import { IAgentProvider } from "@domain/protocols/IAgentProvider";
import { IProcessReceivedMesage } from "@domain/useCases/messaging/iProcessReceivedMessage";

export class ProcessChatwootMessage implements IProcessReceivedMesage {
    constructor(
        private readonly aiAgentProvider: IAgentProvider,
        private readonly findAgentBySlugRepository: FindAiAgentBySlugRepository,
        private readonly getChatContextService: IGetChatContextService,
        private readonly addMessageToContext: IAddMessageWithCacheService
    ){}
    async proccess(params: IMessageJobData): Promise<IProcessReceivedMesage.Result> {
      
        const agent = await this.findAgentBySlugRepository.findBySlug(String(params.slug));

        if(!agent){
            throw new NotFoundError("Agent not found with received slug");
        }

        const ai = this.aiAgentProvider.getProvider(agent.provider);

        if(!ai){
            throw new NotFoundError("Not found Ai Agent with provided name");
        }

        const userMessage = `
            nome: ${params.message_content.contactInfo.name}
            mensagem: ${params.text}
        `;

        await this.addMessageToContext.add({
            accountId: params.accountId,
            conversationId: params.conversationId,
            role: "user",
            message_type: "incoming",
            content_type: "text",
            text: userMessage,
            content: null,
        });

        const context = await this.getChatContextService.getContext(params.accountId, params.conversationId);

        const response = await ai.message({
            prompt: agent.prompt,
            messages: context,
            model: agent.model,
            apiKey: agent.credentials.accessToken,
        });

        await this.addMessageToContext.add({
            accountId: params.accountId,
            conversationId: params.conversationId,
            role: "model",
            message_type: "outgoing",
            content_type: "text",
            text: response.message,
            content: null,
        });

        return {
            action: "answer",
            message: response.message
        };
    }

}