import { DeleteRole, DeleteRoleRepository } from "@domain/index";

export class DbDeleteRole implements DeleteRole{

    constructor(
        private readonly deleteRoleRepository: DeleteRoleRepository
    ){}

    async delete(id: DeleteRoleRepository.Id): Promise<DeleteRoleRepository.Result> {
        await this.deleteRoleRepository.delete(id);
    }

}