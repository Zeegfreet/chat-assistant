
export interface MemoryVerifyIfMessagesExists {
    verify(accountId: string, conversationId: string): Promise<boolean>
}