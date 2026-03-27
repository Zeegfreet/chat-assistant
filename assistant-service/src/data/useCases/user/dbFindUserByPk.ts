import { NotFoundError } from "@presentation/errors/not-found-error";
import { FindUserByPk, FindUserByPkRepository } from "@src/domain/index";

export class DbFindUserByPk implements FindUserByPk{
    constructor(
        private readonly findUserByPkRepository: FindUserByPkRepository
    ){}
    async find(id: FindUserByPk.Params): Promise<FindUserByPk.Result> {
        const user = await this.findUserByPkRepository.findByPk(id);
        if(!user) throw new NotFoundError("User not found.");
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            isBlocked: user.isBlocked,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}