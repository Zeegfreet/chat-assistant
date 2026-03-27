import { DbConnection } from "@db/db/config/dbConnection";
import { FindUserByPkRepository } from "@domain/index";
import { User } from "@src/entitys/user.entity";

export class TypeOrmFindUserByPkRepository implements FindUserByPkRepository {
    async findByPk(id: FindUserByPkRepository.Params): Promise<FindUserByPkRepository.Result> {
        if(!id) return null;
        const userRepository = DbConnection.getInstance().getCollection(User);
        const user = await userRepository.findOne({ where: { id },
            relations: {
                roles: true
            }
        });
        if(!user) return null;
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