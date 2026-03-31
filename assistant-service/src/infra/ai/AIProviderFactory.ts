import { NotFoundError } from "@domain/errors/NotFoundError";
import { IAgentProvider } from "@domain/protocols/IAgentProvider";
import { IMessageToAi } from "@domain/protocols/iMessageToAi";

export class AIProviderFactory implements IAgentProvider {
    constructor(
        private geminiAdapter: IMessageToAi 
    ){}

    getProvider(providerName: string) {
        const providers: Record<string, IMessageToAi> = {
            gemini: this.geminiAdapter
        };

        const provider = providers[providerName];

        if(!provider) {
            throw new NotFoundError(`Provider ${providerName} not found.` );
        }

        return provider;
    }
}