import { DbConnection } from "@db/db/config/dbConnection";
import { FindUserByEmailRepository } from "@domain/index";
import { User } from "@src/entitys/user.entity";
import { ILike } from "typeorm";

export class TypeOrmFindUserByEmailRepository implements FindUserByEmailRepository {
    async findByEmailWithRoles(email: FindUserByEmailRepository.Params): Promise<FindUserByEmailRepository.ResultWithRoles> {
        const userRepository = DbConnection.getInstance().getCollection(User);
        const findUser = await userRepository.findOne({ where: { email: ILike(email) }, relations: {
            roles: {
                permissions: true
            }
        } });

        if (!findUser) return null;
        
        return {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            password: findUser.password,
            isActive: findUser.isActive,
            isAdmin: findUser.isAdmin,
            isBlocked: findUser.isBlocked,
            isVerified: findUser.isVerified,
            roles: findUser.roles,
            createdAt: findUser.createdAt,
            updatedAt: findUser.updatedAt,
        };
    }
    async findByEmail(email: FindUserByEmailRepository.Params): Promise<FindUserByEmailRepository.Result> {
        const userRepository = DbConnection.getInstance().getCollection(User);
        const findUser = await userRepository.findOne({ where: { email: ILike(email) } });

        if (!findUser) return null;

        return {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            password: findUser.password,
            isActive: findUser.isActive,
            isAdmin: findUser.isAdmin,
            isBlocked: findUser.isBlocked,
            isVerified: findUser.isVerified,
            createdAt: findUser.createdAt,
            updatedAt: findUser.updatedAt,
        };
    }
    
}