import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { AddPermissionRepository } from "@domain/index";
import { Permission } from "@src/entitys/permission.entity";

export class TypeOrmAddPermissionRepository implements AddPermissionRepository{

    private dbErrorMapper = DbErrorMapper;

    private get permissionRepository() {
        return DbConnection.getInstance().getCollection(Permission);
    }

    async add(permission: AddPermissionRepository.Params): Promise<AddPermissionRepository.Result> {
        try {
            
            const permissionToAdd = this.permissionRepository.create(permission);
            const savedPermission =  await this.permissionRepository.save(permissionToAdd);
            return {
                id: savedPermission.id,
                resource: savedPermission.resource,
                method: savedPermission.method,
                createdAt: savedPermission.createdAt,
                updatedAt: savedPermission.updatedAt
            };
        } catch (err) {
            const mappedError = this.dbErrorMapper.map(err);
            if(mappedError.kind === "conflict"){
                throw new AlreadyExistsError("Already exists a permission with the receved resource and method.");
            }
            throw err;
        }
    }
}