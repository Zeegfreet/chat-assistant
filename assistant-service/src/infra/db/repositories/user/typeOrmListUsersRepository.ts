import { DbConnection } from "@db/db/config/dbConnection";
import { ListUsersRepository } from "@domain/index";
import { User } from "@src/entitys/user.entity";

export class TypeOrmListUsersRepository implements ListUsersRepository{
    
    private get repository() {
        return DbConnection.getInstance().getCollection(User);
    }

    async list(): Promise<ListUsersRepository.Result[]> {

        const users = await this.repository.find({});

        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            isBlocked: user.isBlocked,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            isDeleted: false,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
    }
    
}