import { DbListUsers } from "@data/useCases";
import { TypeOrmListUsersRepository } from "@db/db/repositories/user/typeOrmListUsersRepository";

export const dbListUsersFactory = () => {
    const listUsersRepository = new TypeOrmListUsersRepository();
    return new DbListUsers(
        listUsersRepository
    );
};