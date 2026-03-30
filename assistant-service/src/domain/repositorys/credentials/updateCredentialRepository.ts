import { CredentialsModel } from "@domain/models/CredentialsModel";

export interface UpdateCredentialRepository {
    update(id: UpdateCredentialRepository.Id, payload: UpdateCredentialRepository.Payload): Promise<UpdateCredentialRepository.Result>
}

export namespace UpdateCredentialRepository{
    export type Id = number
    export type Payload = Partial<Omit<CredentialsModel, "id" | "createdAt" | "updatedAt">>
    export type Result = CredentialsModel
}