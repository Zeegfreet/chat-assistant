import { DbDeletepermission } from "@data/useCases/permission/dbDeletePermission";
import { TypeOrmDeletePermissionRepository } from "@db/db/repositories/permission/typeOrmDeletePermissionRepository";
import { DeletePermissionController } from "@presentation/controllers/permission/deletePermissionController";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeDeletePermissionControllerFactory = () => {
    const deletePermissionRepository = new TypeOrmDeletePermissionRepository();
    const dbDeletePermission = new DbDeletepermission(deletePermissionRepository);
    const singleIdDtoMapper = new SingleIdDtoMapperService();
    return new DeletePermissionController(
        dbDeletePermission,
        singleIdDtoMapper
    );
};