import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { UpdatePermissionRepository } from "@domain/repositorys/permission/updatedPermissionRepository";
import { Permission } from "@src/entitys/permission.entity";

export class TypeOrmUpdatePermissionRepository implements UpdatePermissionRepository{
    private mapper = DbErrorMapper;
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Permission);
    }
    async update(id: UpdatePermissionRepository.Id, payload: UpdatePermissionRepository.Payload): Promise<UpdatePermissionRepository.Result> {
        try {
            
            const permissionToUpdate = await this.repository.findOneBy({ id });
            if(!permissionToUpdate) throw new NotFoundError("Permission not found with received id.");
            const toUpdatePermission = { ...permissionToUpdate, ...payload };
            const updatedPermission = await this.repository.save(toUpdatePermission);
            return updatedPermission;
        } catch (error) {
            const errorMapped = this.mapper.map(error);
            if(errorMapped.kind === "conflict"){
                throw new AlreadyExistsError("Already exists permission with de received data.");
            }

            throw error;
        }
    }

}