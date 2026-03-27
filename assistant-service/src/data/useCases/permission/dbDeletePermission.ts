import { DeletePermissionRepository } from "@domain/repositorys/permission/deletePermissionRepository";
import { DeletePermission } from "@domain/useCases/permission/deletePermission";

export class DbDeletepermission implements DeletePermission{

    constructor(
        private readonly deletePermissionRepository: DeletePermissionRepository
    ){}

    async delete(id: DeletePermission.Id): Promise<DeletePermission.Result> {
        await this.deletePermissionRepository.delete(id);
    }

}