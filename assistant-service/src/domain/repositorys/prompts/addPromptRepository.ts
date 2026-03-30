import { PromptsModel } from "@domain/models/PromptsModel";

export interface AddPromptRepository {
    add(payload: AddPromptRepository.Params): Promise<AddPromptRepository.Result>
}

export namespace AddPromptRepository {
    export type Params = Omit<PromptsModel,
    | "id"
    | "createdAt"
    | "updatedAt"
    >

    export type Result = PromptsModel
}