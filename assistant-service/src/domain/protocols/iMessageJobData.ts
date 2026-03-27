
export interface IMessageJobData {
    conversationId: string;
    contactId: string;
    messageContent: string;
    accountContext: {
        accountId: string;
        inboxId: string;
    },
    contactInfo: {
        name: string;
        email?: string;
        phone?: string;
    }
}