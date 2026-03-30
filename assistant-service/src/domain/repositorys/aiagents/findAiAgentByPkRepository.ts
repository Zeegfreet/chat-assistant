import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface FindAiAgentByPkRepository {
    findById(id: FindAiAgentByPkRepository.Id): Promise<FindAiAgentByPkRepository.Result | null>
}

export namespace FindAiAgentByPkRepository{
    export type Id = number
    export type Result = AiAgentsModel
}