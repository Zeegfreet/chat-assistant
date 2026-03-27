import { ListPermissionRepository } from "@domain/repositorys/permission/listPermissonRepository";
import { ListPermission } from "@domain/useCases/permission/listPermission";

export class DbListPermission implements ListPermission {

    constructor(
        private readonly listPermissionRepository: ListPermissionRepository
    ){}

    async list(params: ListPermission.Params): Promise<ListPermission.Result> {

        if(params.limit && params.limit > 500) params.limit = 500;
        
        const response = await this.listPermissionRepository.list(params);
        return response;
    }

}