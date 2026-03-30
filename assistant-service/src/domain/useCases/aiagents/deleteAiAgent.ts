
export interface DeleteAiAgent {
    delete(id: DeleteAiAgent.Id): Promise<DeleteAiAgent.Result>
}

export namespace DeleteAiAgent{
    export type Id = number
    export type Result = void
}