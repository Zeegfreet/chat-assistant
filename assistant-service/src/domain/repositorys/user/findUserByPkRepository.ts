import { User } from "@domain/models/User";

export interface FindUserByPkRepository {
    findByPk(id: FindUserByPkRepository.Params): Promise<FindUserByPkRepository.Result>;
}

export namespace FindUserByPkRepository {
    export type Params = number
    export type Result = Omit<User, 
        | "password"
        | "deletedAt"
        | "isDeleted"> | null
}