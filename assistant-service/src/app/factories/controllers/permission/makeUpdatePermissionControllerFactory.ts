import { DbUpdatePermission } from "@data/useCases/permission/dbUpdatePermission";
import { TypeOrmUpdatePermissionRepository } from "@db/db/repositories/permission/typeOrmUpdatePermissionRepository";
import { UpdatePermissionController } from "@presentation/controllers/permission/updatePermissionController";

export const makeUpdatePermissionControllerFactory = () => {
    const updatePermissionRepository = new TypeOrmUpdatePermissionRepository();
    const updatePermission = new DbUpdatePermission(
        updatePermissionRepository
    );
    return new UpdatePermissionController(
        updatePermission
    );
};