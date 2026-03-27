import { hashFactory } from "@app/factories/criptography/hashFactory";
import { TypeOrmConfirmUserExistenceByEmail } from "@db/db/repositories";
import { TypeOrmFindDefaultRoleRepository } from "@db/db/repositories/role/typeOrmFindDefaultRoleRepository";
import { TypeOrmAddUserRepository } from "@db/db/repositories/user/typeOrmAddUserRepository";
import { DbSignUp } from "@src/data/useCases/auth/dbSignUp";

export const dbSignUpFactory = () => {
    const confirmUserExistenceByEmailRepository = new TypeOrmConfirmUserExistenceByEmail();
    const addUserRepository = new TypeOrmAddUserRepository();
    const findDefaultRoles = new TypeOrmFindDefaultRoleRepository();
    const hasher = hashFactory();

    return new DbSignUp(
        confirmUserExistenceByEmailRepository,
        addUserRepository,
        findDefaultRoles,
        hasher
    );
};