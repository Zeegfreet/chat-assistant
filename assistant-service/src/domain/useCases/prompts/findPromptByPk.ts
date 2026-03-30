import { PromptsModel } from "@domain/models/PromptsModel";

export interface FindPromptByPk {
    findById(id: FindPromptByPk.Id): Promise<FindPromptByPk.Result>
}

export namespace FindPromptByPk{
    export type Id = number
    export type Result = PromptsModel
}