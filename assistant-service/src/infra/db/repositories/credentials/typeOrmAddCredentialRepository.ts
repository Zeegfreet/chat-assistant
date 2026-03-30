import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { AddCredentialRepository } from "@domain/index";
import { Credentials } from "@src/entitys/credentials.entity";

export class TypeOrmAddCredentialRepository implements AddCredentialRepository{

    private dbErrorMapper = DbErrorMapper;

    private get repository() {
        return DbConnection
            .getInstance()
            .getCollection(Credentials);
    }

    async add(payload: AddCredentialRepository.Params): Promise<AddCredentialRepository.Result> {
        try {
            
            const credentialToAdd = this.repository.create(payload);
            const savedCredential =  await this.repository.save(credentialToAdd);
            return {
                ...savedCredential
            };
        } catch (err) {
            const mappedError = this.dbErrorMapper.map(err);
            if(mappedError.kind === "conflict"){
                throw new AlreadyExistsError("Already exists a credential with the received name.");
            }
            throw err;
        }
    }
}