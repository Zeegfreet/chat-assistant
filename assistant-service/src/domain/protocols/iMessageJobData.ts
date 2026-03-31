
export interface IMessageJobData<T = Record<any, any>> {
    accountId: string;
    conversationId: string;
    contactId: string;
    role: "model" | "user";
    message_type: "incoming" | "outgoing",
    text: string;
    slug?: string;
    contact?: {
        name?: string | null,
        email?: string | null,
        userName?: string | null,
        phoneNumber?: string | null
    }
    message_content: T
}