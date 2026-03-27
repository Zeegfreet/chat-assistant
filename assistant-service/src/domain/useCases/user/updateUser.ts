import { User } from "@domain/models/User";
export interface UpdateUser {
    update(id: UpdateUser.ParamsId, payload: UpdateUser.Params, requesterId: UpdateUser.RequesterId): Promise<UpdateUser.Result>
}

export namespace UpdateUser {
    export type ParamsId = number
    export type Params = Partial<Omit<User,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "isDeleted"
        | "deletedAt">>
    export type RequesterId = number
    export type Result = Omit<User, "password" | "isDeleted" | "deletedAt">;
}