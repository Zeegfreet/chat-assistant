import { User } from "@domain/models/User";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchUser {
    search(params: SearchUser.Params): Promise<SearchUser.Result>
}

export namespace SearchUser {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<Omit<User,
        | "password"
        | "isDeleted"
        | "deletedAt"
        | "roles"
    >>
}