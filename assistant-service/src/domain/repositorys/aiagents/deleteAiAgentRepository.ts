
export interface DeleteAiAgentRepository {
    delete(id: DeleteAiAgentRepository.Id): Promise<DeleteAiAgentRepository.Result>
}

export namespace DeleteAiAgentRepository{
    export type Id = number
    export type Result = void
}