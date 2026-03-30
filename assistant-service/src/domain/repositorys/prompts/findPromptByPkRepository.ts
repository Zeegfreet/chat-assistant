import { PromptsModel } from "@domain/models/PromptsModel";

export interface FindPromptByPkRepository {
    findById(id: FindPromptByPkRepository.Id): Promise<FindPromptByPkRepository.Result | null>
}

export namespace FindPromptByPkRepository{
    export type Id = number
    export type Result = PromptsModel
}