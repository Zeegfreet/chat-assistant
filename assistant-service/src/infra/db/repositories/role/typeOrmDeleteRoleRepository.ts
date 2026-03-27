import { DbConnection } from "@db/db/config/dbConnection";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { DeleteRoleRepository } from "@domain/index";
import { Role } from "@src/entitys/role.entity";

export class TypeOrmDeleteRoleRepository implements DeleteRoleRepository{

    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Role);
    }

    async delete(id: DeleteRoleRepository.Id): Promise<DeleteRoleRepository.Result> {
        if(!id) throw new ValidationError("The received id must be a number");
        const roleToDelete = await this.repository.findOneBy({ id });
        if(!roleToDelete) throw new NotFoundError("Role not found with received id.");
        await this.repository.remove(roleToDelete);
    }
    
}