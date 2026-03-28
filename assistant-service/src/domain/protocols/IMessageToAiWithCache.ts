
export interface IMessageToAiWithCache {
    message(params: IMessageToAiWithCache.Params): Promise<IMessageToAiWithCache.Response>
}

export namespace IMessageToAiWithCache {
    export type Params = {
        prompt: string,
        accountId: string,
        conversationId: string,
        message: string
    }

    export type Response = {
        tokens: number;
        message: string;
    }
}