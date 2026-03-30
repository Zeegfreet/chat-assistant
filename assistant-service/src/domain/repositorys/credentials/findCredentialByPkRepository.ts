import { CredentialsModel } from "@domain/models/CredentialsModel";

export interface FindCredentialByPkRepository {
    findById(id: FindCredentialByPkRepository.Id): Promise<FindCredentialByPkRepository.Result | null>
}

export namespace FindCredentialByPkRepository{
    export type Id = number
    export type Result = CredentialsModel
}