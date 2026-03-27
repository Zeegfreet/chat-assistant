import { Role } from "@domain/models/Role";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchRoleRepository {
    list(params: SearchRoleRepository.Params): Promise<SearchRoleRepository.Result>
}

export namespace SearchRoleRepository {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<Role>
}