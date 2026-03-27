
export interface AddSessionToBlackListRepository {
    add(params: AddSessionToBlackListRepository.Params): Promise<void>
}

export namespace AddSessionToBlackListRepository {
    export type Params = {
        sessionId: string,
        ttl: number
    }
}