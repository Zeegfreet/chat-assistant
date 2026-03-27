import { User } from "@domain/models/User";

export interface UpdateUserRepository {
    update(id: UpdateUserRepository.ParamId, userData: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result>
}

export namespace UpdateUserRepository {
    export type ParamId = number
    export type Params = Partial<Omit<User,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "isDeleted"
        | "deletedAt">>
        
    export type Result = Omit<User, 
        | "password"
        | "isDeleted"
        | "deletedAt"
        >;
}