
export interface DeletePromptRepository {
    delete(id: DeletePromptRepository.Id): Promise<DeletePromptRepository.Result>
}

export namespace DeletePromptRepository{
    export type Id = number
    export type Result = void
}