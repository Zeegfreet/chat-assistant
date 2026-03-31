import { makeFindAiAgentBySlugRepositoryFactory } from "@app/factories/repositories/aiagents/makeFindAiAgentBySlugRepositoryFactory";
import { makeAddChatMessageContextServiceFactory } from "@app/factories/services/makeAddChatMessageContextServiceFactory";
import { makeGetChatContextServiceFactory } from "@app/factories/services/makeGetChatContextServiceFactory";
import { ProcessChatwootMessage } from "@data/useCases/messaging/processChatwootMessage";
import { AIProviderFactory } from "@db/ai/AIProviderFactory";
import { GeminiAdapter } from "@db/ai/gemini/geminiAdapter";

export const makeProcessChatwootMessageFactory = () => {
    const geminiAdapter = new GeminiAdapter();
    const aiAgentProvider = new AIProviderFactory(
        geminiAdapter
    );
    const findAgentBySlugRepository = makeFindAiAgentBySlugRepositoryFactory();
    const getChatContex = makeGetChatContextServiceFactory();
    const addContextMessage = makeAddChatMessageContextServiceFactory();

    return new ProcessChatwootMessage(
        aiAgentProvider,
        findAgentBySlugRepository,
        getChatContex,
        addContextMessage
    );
};