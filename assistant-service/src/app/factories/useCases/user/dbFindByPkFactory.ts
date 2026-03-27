import { DbFindUserByPk } from "@data/useCases";
import { TypeOrmFindUserByPkRepository } from "@db/db/repositories/user/typeOrmFindUserByPkRepository";

export const dbFindUserByPkFactory = () => {
    const findUserByPkRepository = new TypeOrmFindUserByPkRepository();
    return new DbFindUserByPk(findUserByPkRepository);
};