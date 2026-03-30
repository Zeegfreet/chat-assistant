import { PromptsModel } from "@domain/models/PromptsModel";

export interface UpdatePromptRepository {
    update(id: UpdatePromptRepository.Id, payload: UpdatePromptRepository.Payload): Promise<UpdatePromptRepository.Result>
}

export namespace UpdatePromptRepository{
    export type Id = number
    export type Payload = Partial<Omit<PromptsModel, "id" | "createdAt" | "updatedAt">>
    export type Result = PromptsModel
}