import { DbAddRole } from "@data/useCases/role/dbAddRole";
import { TypeOrmAddRoleRepository } from "@db/db/repositories";
import { AddRoleController } from "@presentation/controllers/role/addRoleController";

export const makeAddRoleControllerFactory = () => {
    
    const addRoleRepository = new TypeOrmAddRoleRepository();
    const dbAddRole = new DbAddRole(
        addRoleRepository
    );

    return new AddRoleController(
        dbAddRole
    );
};