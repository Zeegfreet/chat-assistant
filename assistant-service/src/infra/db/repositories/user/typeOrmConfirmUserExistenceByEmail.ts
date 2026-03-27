import { DbConnection } from "@db/db/config/dbConnection";
import { ConfirmUserExistenceByEmailRepository } from "@domain/repositorys/user/confirmUserExistenceByEmailRepository";
import { User } from "@src/entitys/user.entity";
import { ILike } from "typeorm";

export class TypeOrmConfirmUserExistenceByEmail 
implements ConfirmUserExistenceByEmailRepository
{
    private get repository() {
        return DbConnection.getInstance().getCollection(User);
    }

    async verify(email: ConfirmUserExistenceByEmailRepository.Email): Promise<ConfirmUserExistenceByEmailRepository.Exists> {
        const findUser = await this.repository.countBy({ email: ILike(email) });
        return Boolean(findUser);
    }
    
}