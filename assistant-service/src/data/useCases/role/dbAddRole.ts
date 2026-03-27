import { AddRole, AddRoleRepository } from "@domain/index";

export class DbAddRole implements AddRole {
    constructor(
        private readonly addRoleRepository: AddRoleRepository
    ){}
    async add(payload: AddRole.Params): Promise<AddRole.Result> {
        
        const createdRole = await this.addRoleRepository.add(payload);

        return createdRole;
    }

}