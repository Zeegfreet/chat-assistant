import { Role } from "@domain/models/Role";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchRole {
    list(params: SearchRole.Params): Promise<SearchRole.Result>
}

export namespace SearchRole {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<Role>
}