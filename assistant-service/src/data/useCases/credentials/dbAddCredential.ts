import { AddCredential, AddCredentialRepository } from "@domain/index";

export class DbAddCredential implements AddCredential {
    constructor(
        private readonly addCredentialRepository: AddCredentialRepository
    ){}
    async add(payload: AddCredential.Params): Promise<AddCredential.Result> {

        const createdCredential = await this.addCredentialRepository.add(payload);
        
        return createdCredential;
    }

}