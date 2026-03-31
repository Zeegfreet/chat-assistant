import { MessageModel } from "@domain/models/MessageModel";

export interface IMessageToAi {
    message(params: IMessageToAi.Params): Promise<IMessageToAi.Response>
}

export namespace IMessageToAi {
    export type Params = {
        prompt: string;
        messages: MessageModel[];
        model: string;
        apiKey: string
    }

    export type Response = {
        tokens: number;
        message: string;
    }
}