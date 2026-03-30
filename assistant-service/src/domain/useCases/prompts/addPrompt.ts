import { PromptsModel } from "@domain/models/PromptsModel";

export interface AddPrompt {
    add(payload: AddPrompt.Params): Promise<AddPrompt.Result>
}

export namespace AddPrompt {
    export type Params = Omit<PromptsModel, 
    | "id"
    | "createdAt"
    | "updatedAt"
    >
    export type Result = PromptsModel
}