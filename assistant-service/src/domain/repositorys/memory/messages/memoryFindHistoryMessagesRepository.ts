import { MessageModel } from "@domain/models/MessageModel";

export interface MemoryFindHistoryMessagesRepository {
    find(accountId: string, conversationId: string): Promise<MessageModel[]>
}
