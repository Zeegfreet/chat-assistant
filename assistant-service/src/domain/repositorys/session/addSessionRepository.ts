import { Session } from "@domain/models/Session";

export interface AddSessionRepository{
    add(params: AddSessionRepository.Params): Promise<AddSessionRepository.Result>
}

export namespace AddSessionRepository {
    export type Params = Omit<Session, 
    | "id"
    | "user"
    | "createdAt"
    | "updatedAt"> & {
        user: { id: number }
    }

    export type Result = Session
}