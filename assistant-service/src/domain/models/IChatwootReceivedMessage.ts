
export interface IChatwootReceivedMessage {
    event: string,
    account: {
        id: number,
        name: string
    },
    additional_attributes: object,
    content_attributes: object,
    content_type: "text",
    message_type: "incomming" | "outgoing",
    sender: IChatwootPart,
    content: string,
    inbox: {
            id: number,
            name: string,
        },
    conversation: {
        id: number,
        inbox_id: number,
        additional_attributes: object,
        can_reply: boolean,
        channel: string,
        contact_inbox: {
            id: number,
            contact_id: number,
            inbox_id: number,
            source_id: string,
            created_at: string,
            updated_at: string,
            hmac_verified: boolean,
            pubsub_token: string
        },
        messages: [],
        labels: string[],
        meta: {
            sender : IChatwootPart,
            assignee: any,
            assignee_type: any,
            team: IChatwootTeam | null,
        },
        
        status: "pending" | "resolved" | "open"
    },
    source_id: string,
}

export interface IChatwootTeam {
    id: number,
    name: string
}

export interface IChatwootPart {
    id: number,
    additional_attributes: object,
    custom_attributes: object,
    email: string | null,
    identifier: string | null,
    name: string | null,
    phone_number: string | null,
    thumbnail: string | null,
    blocked: boolean,
    type: "contact"
}