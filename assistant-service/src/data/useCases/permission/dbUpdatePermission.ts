import { UpdatePermissionRepository } from "@domain/repositorys/permission/updatedPermissionRepository";
import { UpdatePermission } from "@domain/useCases/permission/updatePermission";

export class DbUpdatePermission implements UpdatePermission{
    constructor(
        private readonly repository: UpdatePermissionRepository
    ){}
    async update(id: UpdatePermission.Id, payload: UpdatePermission.Payload): Promise<UpdatePermission.Result> {
        if(payload.resource) payload.resource = payload.resource.toUpperCase();
        if(payload.method) payload.method = payload.method.toUpperCase();

        const updatedData = await this.repository.update(id, payload);
        return updatedData;
    }
}