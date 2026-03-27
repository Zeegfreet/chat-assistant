import { DbDeleteUser } from "@data/useCases";
import { TypeOrmCountActiveAdminUsersRepository, TypeOrmFindUserByPkRepository } from "@db/db/repositories";
import { TypeOrmDeleteUserRepository } from "@db/db/repositories/user/typeOrmDeleteUserRepository";

export const dbDeleteUserFactory = () => {
    const deleteUserRepository = new TypeOrmDeleteUserRepository();
    const countAdminUserRepository = new TypeOrmCountActiveAdminUsersRepository();
    const findUserByPkrepository = new TypeOrmFindUserByPkRepository();
    
    return new DbDeleteUser(
        deleteUserRepository,
        countAdminUserRepository,
        findUserByPkrepository
    );
};