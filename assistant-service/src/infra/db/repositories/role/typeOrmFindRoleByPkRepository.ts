import { DbConnection } from "@db/db/config/dbConnection";
import { FindRoleByPkRepository } from "@domain/index";
import { Role } from "@src/entitys/role.entity";

export class TypeOrmFindRoleByPkRepository implements FindRoleByPkRepository{
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Role);
    }
    async findById(id: FindRoleByPkRepository.Id): Promise<FindRoleByPkRepository.Result> {
        const role = await this.repository.findOne({ where: { id }, relations: {
            permissions: true
        } });
        return role;
    }
    
}