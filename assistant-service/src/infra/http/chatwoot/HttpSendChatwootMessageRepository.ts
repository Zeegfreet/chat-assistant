import { SendChatwootMessageRepository } from "@domain/index";
import axios from "axios";

export class HttpSendChatwootMessage implements SendChatwootMessageRepository{
    private readonly http = axios;
    async send(params: SendChatwootMessageRepository.Params): Promise<SendChatwootMessageRepository.Result> {
        const url = `/api/accounts/${params.accountId}/conversations/${params.conversationId}`;
        const body = {
            content: params.message,
            private: params.private,
            message_type: "outgoing"
        };

        const headers = {
            "Content-Type": "application/json",
            ...params.headers
        };
        
        const request = await this.http.post(url, body, {
            headers: headers
        });

        return request.data;
    }

}