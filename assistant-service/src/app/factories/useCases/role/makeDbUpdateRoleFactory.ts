import { DbUpdateRole } from "@data/useCases";
import { TypeOrmFindRoleByPkRepository, TypeOrmUpdateRoleRepository } from "@db/db/repositories";

export const makeDbUpdateRoleFactory = () => {
    const updateRoleRepository = new TypeOrmUpdateRoleRepository();
    const findRoleByPkRepository = new TypeOrmFindRoleByPkRepository();
    return new DbUpdateRole(
        updateRoleRepository,
        findRoleByPkRepository
    );
};