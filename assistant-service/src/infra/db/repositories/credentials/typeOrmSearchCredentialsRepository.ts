import { DbConnection } from "@db/db/config/dbConnection";
import { SearchHelper } from "@db/db/protocols/searchHelper";
import { SearchCredentialsRepository } from "@domain/index";
import { Credentials } from "@src/entitys/credentials.entity";
import { Repository } from "typeorm";

export class TypeOrmSearchCredentialsRepository implements SearchCredentialsRepository {

    constructor(
        private readonly searchHelper: SearchHelper
    ){}

    private get repository(): Repository<Credentials> {
        return DbConnection
            .getInstance()
            .getCollection(Credentials);
    }

    async list(params: SearchCredentialsRepository.Params): Promise<SearchCredentialsRepository.Result> {
        const qb =  this.repository.createQueryBuilder();
        // .select("id, resource, method, createdAt, updatedAt");
        const [credentials, count] = await this.searchHelper
            .apply(qb, params)
            .getManyAndCount();
        return {
            totalPages: Math.ceil(count / Number(params.limit)) || 1,
            currentPage: Number(params.page) || 1,
            data: credentials
        };
    }
    
}