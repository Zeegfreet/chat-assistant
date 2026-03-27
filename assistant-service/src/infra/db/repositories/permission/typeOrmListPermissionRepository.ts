import { DbConnection } from "@db/db/config/dbConnection";
import { SearchHelper } from "@db/db/protocols/searchHelper";
import { ListPermissionRepository } from "@domain/repositorys/permission/listPermissonRepository";
import { Permission } from "@src/entitys/permission.entity";
import { Repository } from "typeorm";

export class TypeOrmListPermissionRepository implements ListPermissionRepository {

    constructor(
        private readonly searchHelper: SearchHelper
    ){}

    private get repository(): Repository<Permission> {
        return DbConnection
            .getInstance()
            .getCollection(Permission);
    }

    async list(params: ListPermissionRepository.Params): Promise<ListPermissionRepository.Result> {
        const qb =  this.repository.createQueryBuilder();
        // .select("id, resource, method, createdAt, updatedAt");
        const [permissions, count] = await this.searchHelper
            .apply(qb, params)
            .getManyAndCount();
        return {
            totalPages: Math.ceil(count / Number(params.limit)) || 1,
            currentPage: Number(params.page) || 1,
            data: permissions
        };
    }
    
}