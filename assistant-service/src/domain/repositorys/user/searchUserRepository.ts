import { User } from "@domain/models/User";
import { SearchParams, SearchResult } from "@domain/protocols/searchParams";

export interface SearchUserRepository {
    search(params: SearchUserRepository.Params): Promise<SearchUserRepository.Result>
}

export namespace SearchUserRepository {
    export type Params = Partial<SearchParams>
    export type Result = SearchResult<Omit<User,
        | "password"
        | "isDeleted"
        | "deletedAt"
        | "roles"
    >>
}