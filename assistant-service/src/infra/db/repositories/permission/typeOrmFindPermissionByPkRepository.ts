import { DbConnection } from "@db/db/config/dbConnection";
import { FindPermissionByPkRepository } from "@domain/repositorys/permission/findPermissionByPkRepository";
import { Permission } from "@src/entitys/permission.entity";

export class TypeOrmFindPermissionByPkRepository implements FindPermissionByPkRepository{
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Permission);
    }
    async findById(id: FindPermissionByPkRepository.Id): Promise<FindPermissionByPkRepository.Result> {
        const permission = await this.repository.findOne({ where: { id } });
        return permission;
    }
    
}