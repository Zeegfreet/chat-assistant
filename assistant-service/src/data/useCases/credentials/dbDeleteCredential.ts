import { DeleteCredential, DeleteCredentialRepository } from "@domain/index";

export class DbDeleteCredential implements DeleteCredential{

    constructor(
        private readonly deleteCredentialRepository: DeleteCredentialRepository
    ){}

    async delete(id: DeleteCredential.Id): Promise<DeleteCredential.Result> {
        await this.deleteCredentialRepository.delete(id);
    }

}