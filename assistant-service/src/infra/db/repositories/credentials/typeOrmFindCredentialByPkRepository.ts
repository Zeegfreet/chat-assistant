import { DbConnection } from "@db/db/config/dbConnection";
import { FindCredentialByPkRepository } from "@domain/index";
import { Credentials } from "@src/entitys/credentials.entity";

export class TypeOrmFindCredentialByPkRepository implements FindCredentialByPkRepository{
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Credentials);
    }
    async findById(id: FindCredentialByPkRepository.Id): Promise<FindCredentialByPkRepository.Result> {
        const credential = await this.repository.findOne({ where: { id } });
        return credential;
    }
    
}