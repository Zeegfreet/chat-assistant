import { IMessageToAi } from "@domain/protocols/iMessageToAi";
import { GoogleGenAI } from "@google/genai";

export class GeminiAdapter implements IMessageToAi {
    async message(params: IMessageToAi.Params): Promise<IMessageToAi.Response> {
        const agent = new GoogleGenAI({ apiKey: params.apiKey });
        const response = await agent.models.generateContent({
            model: params.model,
            contents: [
                {
                    role: "system",
                    parts: [{ text: params.prompt }],
                },
                ...params.messages.map((message) => ({
                    role: message.role === "model" ? "system" : "user",
                    parts: [{ text: message.text }]
                }))
            ]
        });

        return {
            tokens: response.usageMetadata.totalTokenCount,
            message: response.text
        };
    }

}