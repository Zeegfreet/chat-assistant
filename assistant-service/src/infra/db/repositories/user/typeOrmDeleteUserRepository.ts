import { DbConnection } from "@db/db/config/dbConnection";
import { DeleteUserRepository } from "@domain/index";
import { NotFoundError } from "@presentation/errors";
import { User } from "@src/entitys/user.entity";

export class TypeOrmDeleteUserRepository implements DeleteUserRepository {
    async delete(id: DeleteUserRepository.Params): Promise<DeleteUserRepository.Result> {
        const userRepository = DbConnection.getInstance().getCollection(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) return new NotFoundError("User not found");
        user.markAsDeleted();
        await userRepository.save(user);
        await userRepository.softRemove(user);
    }
    
}