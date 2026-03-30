import { CredentialsModel } from "@domain/models/CredentialsModel";

export interface AddCredential {
    add(payload: AddCredential.Params): Promise<AddCredential.Result>
}

export namespace AddCredential {
    export type Params = Omit<CredentialsModel, 
    | "id"
    | "createdAt"
    | "updatedAt"
    >
    export type Result = CredentialsModel
}