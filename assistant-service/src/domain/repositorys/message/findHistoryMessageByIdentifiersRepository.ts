import { MessageModel } from "@domain/models/MessageModel";

export interface FindHistoryMessageByIdentifiersRepository {
    findByIdentifiers(params: FindHistoryMessageByIdentifiersRepository.Params, limit: number): Promise<FindHistoryMessageByIdentifiersRepository.Result[]>
}

export namespace FindHistoryMessageByIdentifiersRepository {
    export type Params = {
        conversationId: string;
        accountId: string;
    }

    export type Result = MessageModel
}