import { DbConnection } from "@db/db/config/dbConnection";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AddSessionRepository } from "@domain/index";
import { Session } from "@src/entitys/session.entity";
import { User } from "@src/entitys/user.entity";

export class TypeOrmAddSessionRepository implements AddSessionRepository{

    private get sessionRepository(){
        return DbConnection.getInstance().getCollection(Session);
    }

    private get userRepository(){
        return DbConnection.getInstance().getCollection(User);
    }

    async add(params: AddSessionRepository.Params): Promise<AddSessionRepository.Result> {
        const user = await this.userRepository.countBy({ id: params.user.id });
        if(!user) throw new NotFoundError("User not found");
        const sessionToCreate = this.sessionRepository.create(params);
        return await this.sessionRepository.save(sessionToCreate);
    }

}