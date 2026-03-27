import { ProcessChatwootMessage } from "@data/useCases/messaging/processChatwootMessage";
import { GeminiSendMessage } from "@db/ai/gemini/geminiSendMessage";
import { FileSystemFindPromptByNameRepository } from "@db/fileSystem/repositories/fileSystemFindPromptByNameRepository";

export const makeProcessChatwootMessageFactory = () => {
    const ai = new GeminiSendMessage("gemini-3.1-flash-lite-preview");
    const findPrompt = new FileSystemFindPromptByNameRepository();
    const promptName = "agente-de-cobrancas";

    return new ProcessChatwootMessage(
        ai,
        findPrompt,
        promptName
    );
};