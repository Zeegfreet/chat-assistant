import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindRoleByPk, FindRoleByPkRepository } from "@domain/index";

export class DbFindRoleByPk implements FindRoleByPk{

    constructor(
        private readonly repository: FindRoleByPkRepository
    ){}

    async findById(id: FindRoleByPk.Id): Promise<FindRoleByPk.Result> {
        const role = await this.repository.findById(id);
        if(!role) throw new NotFoundError("Not found role with received id.");
        return role;
    }

}