import { MessageModel } from "@domain/models/MessageModel";

export interface IMessageToAi {
    message(prompt: IMessageToAi.Prompt, messages: IMessageToAi.Messages[]): Promise<IMessageToAi.Response>
}

export namespace IMessageToAi {
    export type Prompt  = string;
    export type Messages = MessageModel;

    export type Response = {
        tokens: number;
        message: string;
    }
}