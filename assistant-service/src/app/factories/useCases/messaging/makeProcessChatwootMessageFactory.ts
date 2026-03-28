import { makeAddChatMessageContextServiceFactory } from "@app/factories/services/makeAddChatMessageContextServiceFactory";
import { makeGetChatContextServiceFactory } from "@app/factories/services/makeGetChatContextServiceFactory";
import { ProcessChatwootMessage } from "@data/useCases/messaging/processChatwootMessage";
import { GeminiSendMessage } from "@db/ai/gemini/geminiSendMessage";
import { FileSystemFindPromptByNameRepository } from "@db/fileSystem/repositories/fileSystemFindPromptByNameRepository";

export const makeProcessChatwootMessageFactory = () => {
    const ai = new GeminiSendMessage("gemini-3.1-flash-lite-preview");
    const findPrompt = new FileSystemFindPromptByNameRepository();
    const promptName = "agente-de-cobrancas";
    const getChatContex = makeGetChatContextServiceFactory();
    const addContextMessage = makeAddChatMessageContextServiceFactory();

    return new ProcessChatwootMessage(
        ai,
        findPrompt,
        promptName,
        getChatContex,
        addContextMessage
    );
};