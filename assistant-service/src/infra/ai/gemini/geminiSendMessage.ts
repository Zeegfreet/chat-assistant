import { IMessageToAi } from "@domain/protocols/iMessageToAi";
import { GeminiConnector } from "./config/gemini";

export class GeminiSendMessage implements IMessageToAi {
    constructor(
        private readonly modelName: string
    ){}

    private get agent(){
        return GeminiConnector.getInstance().getAgent();
    }

    async message(prompt: IMessageToAi.Prompt, message: IMessageToAi.Message): Promise<IMessageToAi.Response> {
        const response = await this.agent.models.generateContent({
            model: this.modelName,
            contents: [
                {
                    role: "system",
                    parts: [{ text: prompt }]
                },
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ]
        });

        return {
            tokens: response.usageMetadata.totalTokenCount,
            message: response.text
        };
    }

}