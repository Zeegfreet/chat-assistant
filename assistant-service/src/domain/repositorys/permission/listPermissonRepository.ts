import { Permission } from "@domain/models/Permission";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface ListPermissionRepository {
    list(params: ListPermissionRepository.Params): Promise<ListPermissionRepository.Result>
}

export namespace ListPermissionRepository {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<Permission>
}