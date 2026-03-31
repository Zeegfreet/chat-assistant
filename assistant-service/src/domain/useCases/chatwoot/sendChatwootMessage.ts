
export interface SendChatwootMessage {
    send(params: SendChatwootMessage.Params): Promise<void>
}

export namespace SendChatwootMessage {
    export type Params = {
        baseUrl: string;
        headers: object;
        message: string;
        accountId: string;
        private?: boolean;
        conversationId: string;
    }

}