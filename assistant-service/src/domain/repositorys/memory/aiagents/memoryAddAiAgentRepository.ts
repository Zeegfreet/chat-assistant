import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface MemoryAddAiAgentRepository {
    add(payload: MemoryAddAiAgentRepository.Params): Promise<void>
}

export namespace MemoryAddAiAgentRepository {
    export type Params = AiAgentsModel

}