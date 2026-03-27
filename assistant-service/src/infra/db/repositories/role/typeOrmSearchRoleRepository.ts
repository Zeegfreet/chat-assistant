import { DbConnection } from "@db/db/config/dbConnection";
import { SearchHelper } from "@db/db/protocols/searchHelper";
import { SearchRoleRepository } from "@domain/index";
import { Role } from "@src/entitys/role.entity";
import { Repository } from "typeorm";

export class TypeOrmSearchRoleRepository implements SearchRoleRepository {

    constructor(
        private readonly searchHelper: SearchHelper
    ){}

    private get repository(): Repository<Role> {
        return DbConnection
            .getInstance()
            .getCollection(Role);
    }

    async list(params: SearchRoleRepository.Params): Promise<SearchRoleRepository.Result> {
        const qb =  this.repository.createQueryBuilder();

        const [roles, count] = await this.searchHelper
            .apply(qb, params)
            .getManyAndCount();

        return {
            totalPages: Math.ceil(count / Number(params.limit)) || 1,
            currentPage: Number(params.page) || 1,
            data: roles
        };
    }
    
}