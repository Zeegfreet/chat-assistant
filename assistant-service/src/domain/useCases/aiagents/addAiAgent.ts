import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface AddAiAgent {
    add(payload: AddAiAgent.Params): Promise<AddAiAgent.Result>
}

export namespace AddAiAgent {
    export type Params = Omit<AiAgentsModel, 
    | "id"
    | "createdAt"
    | "updatedAt"
    >
    export type Result = AiAgentsModel
}