import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { UpdateCredentialRepository } from "@domain/index";
import { Credentials } from "@src/entitys/credentials.entity";

export class TypeOrmUpdateCredentialRepository implements UpdateCredentialRepository{
    private mapper = DbErrorMapper;
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Credentials);
    }
    async update(id: UpdateCredentialRepository.Id, payload: UpdateCredentialRepository.Payload): Promise<UpdateCredentialRepository.Result> {
        try {
            
            const credentialToUpdate = await this.repository.findOneBy({ id });
            if(!credentialToUpdate) throw new NotFoundError("Credential not found with received id.");
            const toUpdateCredential = { ...credentialToUpdate, ...payload };
            const updatedCredential = await this.repository.save(toUpdateCredential);
            return updatedCredential;
        } catch (error) {
            const errorMapped = this.mapper.map(error);
            if(errorMapped.kind === "conflict"){
                throw new AlreadyExistsError("Already exists credential with de received name.");
            }

            throw error;
        }
    }

}