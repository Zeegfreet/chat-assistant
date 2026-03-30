import { PromptsModel } from "@domain/models/PromptsModel";

export interface UpdatePrompt {
    update(id: UpdatePrompt.Id, payload: UpdatePrompt.Payload): Promise<UpdatePrompt.Result>
}

export namespace UpdatePrompt{
    export type Id = number
    export type Payload = Partial<Omit<PromptsModel, "id" | "createdAt" | "updatedAt">>
    export type Result = PromptsModel
}