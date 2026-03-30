import { UpdateCredential, UpdateCredentialRepository } from "@domain/index";

export class DbUpdateCredential implements UpdateCredential{
    constructor(
        private readonly updateCredentialRepository: UpdateCredentialRepository
    ){}
    async update(id: UpdateCredential.Id, payload: UpdateCredential.Payload): Promise<UpdateCredential.Result> {
      
        const updatedData = await this.updateCredentialRepository.update(id, payload);
        return updatedData;
    }
}