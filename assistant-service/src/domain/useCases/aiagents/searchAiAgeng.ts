import { AiAgentsModel } from "@domain/models/AiAgentsModel";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchAiAgent {
    list(params: SearchAiAgent.Params): Promise<SearchAiAgent.Result>
}

export namespace SearchAiAgent {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<AiAgentsModel>
}