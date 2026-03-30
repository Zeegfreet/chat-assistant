import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface AddAiAgentRepository {
    add(payload: AddAiAgentRepository.Params): Promise<AddAiAgentRepository.Result>
}

export namespace AddAiAgentRepository {
    export type Params = Omit<AiAgentsModel,
    | "id"
    | "createdAt"
    | "updatedAt"
    >

    export type Result = AiAgentsModel
}