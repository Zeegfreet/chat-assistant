import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface UpdateAiAgentRepository {
    update(id: UpdateAiAgentRepository.Id, payload: UpdateAiAgentRepository.Payload): Promise<UpdateAiAgentRepository.Result>
}

export namespace UpdateAiAgentRepository{
    export type Id = number
    export type Payload = Partial<Omit<AiAgentsModel, "id" | "createdAt" | "updatedAt">>
    export type Result = AiAgentsModel
}