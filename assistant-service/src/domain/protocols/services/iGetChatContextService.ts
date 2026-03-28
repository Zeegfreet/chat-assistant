import { MessageModel } from "@domain/models/MessageModel";

export interface IGetChatContextService {
    getContext(accountId: string, conversationId: string): Promise<IGetChatContextService.Result[]>
}

export namespace IGetChatContextService {
    export type Result = MessageModel
}