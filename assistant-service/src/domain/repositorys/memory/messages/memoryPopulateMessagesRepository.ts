import { MessageModel } from "@domain/models/MessageModel";

export interface MemoryPopulateMessagesRepository {
    populate(
        accountId: MemoryPopulateMessagesRepository.AccountID,
        conversationId: MemoryPopulateMessagesRepository.ConversationID,
        messages: MemoryPopulateMessagesRepository.Messages
    ): Promise<void>
}

export namespace MemoryPopulateMessagesRepository {
    export type AccountID = string;
    export type ConversationID = string;
    export type Messages = MessageModel[];
}