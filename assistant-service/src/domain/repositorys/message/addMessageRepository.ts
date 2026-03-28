import { MessageModel } from "@domain/models/MessageModel";

export interface AddMessageRepository {
    add(params: AddMessageRepository.Params): Promise<AddMessageRepository.Result>
}

export namespace AddMessageRepository {
    export type Params = Omit<MessageModel, "id" | "createdAt" | "updatedAt">

    export type Result = MessageModel
}