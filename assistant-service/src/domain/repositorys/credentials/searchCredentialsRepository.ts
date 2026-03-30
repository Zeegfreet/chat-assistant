import { CredentialsModel } from "@domain/models/CredentialsModel";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchCredentialsRepository {
    list(params: SearchCredentialsRepository.Params): Promise<SearchCredentialsRepository.Result>
}

export namespace SearchCredentialsRepository {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<CredentialsModel>
}