import { CredentialsModel } from "@domain/models/CredentialsModel";

export interface FindCredentialByPk {
    findById(id: FindCredentialByPk.Id): Promise<FindCredentialByPk.Result>
}

export namespace FindCredentialByPk{
    export type Id = number
    export type Result = CredentialsModel
}