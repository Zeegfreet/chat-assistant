import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface FindAiAgentByPk {
    findById(id: FindAiAgentByPk.Id): Promise<FindAiAgentByPk.Result>
}

export namespace FindAiAgentByPk{
    export type Id = number
    export type Result = AiAgentsModel
}