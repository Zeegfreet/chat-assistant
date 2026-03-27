import { DbUpdateUser } from "@data/useCases";
import { TypeOrmFindUserByPkRepository } from "@db/db/repositories";
import { TypeOrmUpdateUserRepository } from "@db/db/repositories/user/typeOrmUpdateUserRepository";

export const dbUpdateUserFactory = () => {
    const dbUpdateUserRepository = new TypeOrmUpdateUserRepository();
    const findUserByPkRepository = new TypeOrmFindUserByPkRepository();

    return new DbUpdateUser(
        dbUpdateUserRepository,
        findUserByPkRepository
    );
};