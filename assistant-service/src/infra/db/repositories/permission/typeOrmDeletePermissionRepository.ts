import { DbConnection } from "@db/db/config/dbConnection";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { DeletePermissionRepository } from "@domain/repositorys/permission/deletePermissionRepository";
import { Permission } from "@src/entitys/permission.entity";

export class TypeOrmDeletePermissionRepository implements DeletePermissionRepository{

    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Permission);
    }

    async delete(id: DeletePermissionRepository.Id): Promise<DeletePermissionRepository.Result> {
        if(!id) throw new ValidationError("The received id must be a number");
        const permissionToDelete = await this.repository.findOneBy({ id });
        if(!permissionToDelete) throw new NotFoundError("Permission not found with received id.");
        await this.repository.remove(permissionToDelete);
    }
    
}