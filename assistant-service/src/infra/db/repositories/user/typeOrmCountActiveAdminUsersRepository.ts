import { DbConnection } from "@db/db/config/dbConnection";
import { CountActiveAdminUsersRepository } from "@domain/index";
import { User } from "@src/entitys/user.entity";

export class TypeOrmCountActiveAdminUsersRepository implements CountActiveAdminUsersRepository{

    private get repository(){
        return DbConnection.getInstance().getCollection(User);
    }

    async count(): Promise<CountActiveAdminUsersRepository.Result> {
        return await this.repository.count({ where: { 
            isAdmin: true,
            isBlocked: false
        } });
    }

}