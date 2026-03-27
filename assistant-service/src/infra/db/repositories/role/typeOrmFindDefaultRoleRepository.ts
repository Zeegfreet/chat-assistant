import { DbConnection } from "@db/db/config/dbConnection";
import { FindDefaultRoleRepository } from "@domain/index";
import { Role } from "@src/entitys/role.entity";
import { Repository } from "typeorm";

export class TypeOrmFindDefaultRoleRepository implements FindDefaultRoleRepository{

    private get repository(): Repository<Role> {
        return DbConnection
            .getInstance()
            .getCollection(Role);
    }

    async find(): Promise<FindDefaultRoleRepository.Result> {
        const defaultRoles = await this.repository.findBy({ 
            isDefault: true, 
            isActive: true });
        return defaultRoles;
    }

}