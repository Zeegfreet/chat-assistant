
export interface DeletePrompt {
    delete(id: DeletePrompt.Id): Promise<DeletePrompt.Result>
}

export namespace DeletePrompt{
    export type Id = number
    export type Result = void
}