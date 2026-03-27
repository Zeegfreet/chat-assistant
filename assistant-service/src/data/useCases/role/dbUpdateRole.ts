import { FindRoleByPkRepository, UpdateRole, UpdateRoleRepository } from "@domain/index";

export class DbUpdateRole implements UpdateRole{
    constructor(
        private readonly repository: UpdateRoleRepository,
        private readonly findByPkRepository: FindRoleByPkRepository
    ){}
    async update(id: UpdateRole.Id, payload: UpdateRole.Payload): Promise<UpdateRole.Result> {

        const updatedRole = await this.repository.update(id, payload);

        if(!updatedRole) throw new Error("Role not updated");

        const role = await this.findByPkRepository.findById(updatedRole.id);
        
        return role;
    }
}