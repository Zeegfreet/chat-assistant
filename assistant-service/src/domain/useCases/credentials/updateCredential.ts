import { CredentialsModel } from "@domain/models/CredentialsModel";

export interface UpdateCredential {
    update(id: UpdateCredential.Id, payload: UpdateCredential.Payload): Promise<UpdateCredential.Result>
}

export namespace UpdateCredential{
    export type Id = number
    export type Payload = Partial<Omit<CredentialsModel, "id" | "createdAt" | "updatedAt">>
    export type Result = CredentialsModel
}