import { hashFactory } from "@app/factories/criptography/hashFactory";
import { DbAddUser } from "@data/useCases";
import { TypeOrmConfirmUserExistenceByEmail } from "@db/db/repositories";
import { TypeOrmAddUserRepository } from "@db/db/repositories/user/typeOrmAddUserRepository";

export const dbAddUserFactory = () => {
    const hasher = hashFactory();
    const addUserRepository = new TypeOrmAddUserRepository();
    const confirmUserExistenceByEmail = new TypeOrmConfirmUserExistenceByEmail();

    return new DbAddUser(
        hasher,
        addUserRepository,
        confirmUserExistenceByEmail
    );
};