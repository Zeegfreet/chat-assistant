import { AiAgentsModel } from "@domain/models/AiAgentsModel";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchAiAgentRepository {
    list(params: SearchAiAgentRepository.Params): Promise<SearchAiAgentRepository.Result>
}

export namespace SearchAiAgentRepository {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<AiAgentsModel>
}