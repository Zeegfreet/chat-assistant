import { PromptsModel } from "@domain/models/PromptsModel";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchPromptRepository {
    list(params: SearchPromptRepository.Params): Promise<SearchPromptRepository.Result>
}

export namespace SearchPromptRepository {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<PromptsModel>
}