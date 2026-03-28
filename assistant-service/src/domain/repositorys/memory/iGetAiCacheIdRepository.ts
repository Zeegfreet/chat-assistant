
export interface IGetAiCacheIdRepository {
    get(params: IGetAiCacheIdRepository.Params): Promise<IGetAiCacheIdRepository.Result | null>
}

export namespace IGetAiCacheIdRepository {
    export type Params = {
        conversationId: string,
        accountId: string,
    }

    export type Result = string;
}