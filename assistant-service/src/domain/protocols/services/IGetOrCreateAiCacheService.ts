
export interface IGetOrCreateAiCacheService {
    getOrCreate(params: IGetOrCreateAiCacheService.Params): Promise<IGetOrCreateAiCacheService.Result>
}

export namespace IGetOrCreateAiCacheService {
    export type Params = {
        accountId: string,
        conversationId: string,
    }

    export type Result = string
}