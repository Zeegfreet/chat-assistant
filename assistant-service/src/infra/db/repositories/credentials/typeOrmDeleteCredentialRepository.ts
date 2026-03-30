import { DbConnection } from "@db/db/config/dbConnection";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { DeleteCredentialRepository } from "@domain/index";
import { Credentials } from "@src/entitys/credentials.entity";

export class TypeOrmDeleteCredentialRepository implements DeleteCredentialRepository{

    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Credentials);
    }

    async delete(id: DeleteCredentialRepository.Id): Promise<DeleteCredentialRepository.Result> {
        if(!id) throw new ValidationError("The received id must be a number");
        const credentialToDelete = await this.repository.findOneBy({ id });
        if(!credentialToDelete) throw new NotFoundError("Credential not found with received id.");
        await this.repository.remove(credentialToDelete);
    }
    
}