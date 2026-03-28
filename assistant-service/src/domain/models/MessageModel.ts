import { BaseEntity } from "./BaseEntity";

export class MessageModel extends BaseEntity{
    accountId: string;
    conversationId: string;
    role: "model" | "user";
    message_type: "incoming" | "outgoing";
    content_type: "text";
    text: string | null;
    content: string | null;
}