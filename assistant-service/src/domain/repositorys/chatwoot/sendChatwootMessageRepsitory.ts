
export interface SendChatwootMessageRepository {
    send(params: SendChatwootMessageRepository.Params): Promise<SendChatwootMessageRepository.Result>
}

export namespace SendChatwootMessageRepository {
    export type Params = {
        baseUrl: string;
        headers: object;
        message: string;
        accountId: string;
        private?: boolean;
        conversationId: string;
    }

    export type Result = {
        id: number,
        content: string,
        account_id: number,
        inbox_id: number,
        conversation_id: number,
        status: string,
        [key: string]: any
    }
}