import { AddPermission, AddPermissionRepository } from "@domain/index";

export class DbAddPermission implements AddPermission {
    constructor(
        private readonly addPermissionRepository: AddPermissionRepository
    ){}
    async add(payload: AddPermission.Params): Promise<AddPermission.Result> {

        if(payload.method) payload.method = payload.method.toUpperCase();
        if(payload.resource) payload.resource = payload.resource.toUpperCase();
        
        const newPermission = await this.addPermissionRepository.add(payload);
        return newPermission;
    }

}