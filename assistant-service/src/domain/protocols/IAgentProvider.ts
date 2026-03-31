import { IMessageToAi } from "./iMessageToAi";

export interface IAgentProvider {
    getProvider(providerName: string): IMessageToAi
}