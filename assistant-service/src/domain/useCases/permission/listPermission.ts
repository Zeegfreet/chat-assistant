import { Permission } from "@domain/models/Permission";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface ListPermission {
    list(params: ListPermission.Params): Promise<ListPermission.Result>
}

export namespace ListPermission {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<Permission>
}