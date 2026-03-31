
export interface IMessageJobData<T = Record<any, any>> {
    accountId: string;
    conversationId: string;
    contactId: string;
    role: "model" | "user";
    message_type: string,
    text: string;
    slug?: string;
    message_content: T
}