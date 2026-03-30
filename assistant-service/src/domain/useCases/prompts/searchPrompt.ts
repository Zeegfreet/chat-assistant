import { PromptsModel } from "@domain/models/PromptsModel";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchPrompt {
    list(params: SearchPrompt.Params): Promise<SearchPrompt.Result>
}

export namespace SearchPrompt {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<PromptsModel>
}