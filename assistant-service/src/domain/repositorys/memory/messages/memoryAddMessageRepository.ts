import { MessageModel } from "@domain/models/MessageModel";

export interface MemoryAddMessageRepository {
    add(params: MemoryAddMessageRepository.Params, limit: number): Promise<void>
}

export namespace MemoryAddMessageRepository {
    export type Params = MessageModel
}