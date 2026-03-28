import { MessageModel } from "@domain/models/MessageModel";

export interface IAddMessageWithCacheService {
    add(params: IAddMessageWithCacheService.Params): Promise<IAddMessageWithCacheService.Result>
}

export namespace IAddMessageWithCacheService {
    export type Params = Omit<MessageModel, "id" | "createdAt" | "updatedAt">
    export type Result = MessageModel
}