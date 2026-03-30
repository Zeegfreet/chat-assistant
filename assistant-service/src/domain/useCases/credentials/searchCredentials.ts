import { CredentialsModel } from "@domain/models/CredentialsModel";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchCredentials {
    list(params: SearchCredentials.Params): Promise<SearchCredentials.Result>
}

export namespace SearchCredentials {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<CredentialsModel>
}