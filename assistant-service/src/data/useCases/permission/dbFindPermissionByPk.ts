import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindPermissionByPkRepository } from "@domain/repositorys/permission/findPermissionByPkRepository";
import { FindPermissionByPk } from "@domain/useCases/permission/findPermissionByPk";

export class DbFindPermissionByPk implements FindPermissionByPk{

    constructor(
        private readonly repository: FindPermissionByPkRepository
    ){}

    async findById(id: FindPermissionByPk.Id): Promise<FindPermissionByPk.Result> {
        const permission = await this.repository.findById(id);
        if(!permission) throw new NotFoundError("Not found permission with received id.");
        return permission;
    }

}