import { CredentialsModel } from "@domain/models/CredentialsModel";

export interface AddCredentialRepository {
    add(payload: AddCredentialRepository.Params): Promise<AddCredentialRepository.Result>
}

export namespace AddCredentialRepository {
    export type Params = Omit<CredentialsModel,
    | "id"
    | "createdAt"
    | "updatedAt"
    >

    export type Result = CredentialsModel
}