import { makeAddChatMessageContextServiceFactory } from "@app/factories/services/makeAddChatMessageContextServiceFactory";
import { makeGetChatContextServiceFactory } from "@app/factories/services/makeGetChatContextServiceFactory";
import { ProcessChatwootMessage } from "@data/useCases/messaging/processChatwootMessage";
import { AIProviderFactory } from "@db/ai/aIProviderFactory";
import { GeminiAdapter } from "@db/ai/gemini/geminiAdapter";
import { TypeOrmFindAiAgentBySlugRepository } from "@db/db/repositories";

export const makeProcessChatwootMessageFactory = () => {
    const geminiAdapter = new GeminiAdapter();
    const aiAgentProvider = new AIProviderFactory(
        geminiAdapter
    );
    const findAgentBySlugRepository = new TypeOrmFindAiAgentBySlugRepository();
    const getChatContex = makeGetChatContextServiceFactory();
    const addContextMessage = makeAddChatMessageContextServiceFactory();

    return new ProcessChatwootMessage(
        aiAgentProvider,
        findAgentBySlugRepository,
        getChatContex,
        addContextMessage
    );
};