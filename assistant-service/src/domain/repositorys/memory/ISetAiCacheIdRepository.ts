
export interface ISetAiCacheIdRepository {
    set(params: ISetAiCacheIdRepository.Params): Promise<void>
}

export namespace ISetAiCacheIdRepository {
    export type Params = {
        conversationId: string,
        accountId: string,
        cacheId: string,
        expiration: number,
    }

}