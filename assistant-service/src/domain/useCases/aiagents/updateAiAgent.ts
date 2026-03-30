import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface UpdateAiAgent {
    update(id: UpdateAiAgent.Id, payload: UpdateAiAgent.Payload): Promise<UpdateAiAgent.Result>
}

export namespace UpdateAiAgent{
    export type Id = number
    export type Payload = Partial<Omit<AiAgentsModel, "id" | "createdAt" | "updatedAt">>
    export type Result = AiAgentsModel
}