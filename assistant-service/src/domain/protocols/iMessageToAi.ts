
export interface IMessageToAi {
    message(prompt: IMessageToAi.Prompt, message: IMessageToAi.Message): Promise<IMessageToAi.Response>
}

export namespace IMessageToAi {
    export type Prompt  = string;
    export type Message = string;

    export type Response = {
        tokens: number;
        message: string;
    }
}