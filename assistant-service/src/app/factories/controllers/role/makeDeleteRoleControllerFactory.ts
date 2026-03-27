import { DbDeleteRole } from "@data/useCases";
import { TypeOrmDeleteRoleRepository } from "@db/db/repositories";
import { DeleteRoleController } from "@presentation/controllers";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeDeleteRoleControllerFactory = () => {

    const deleteRoleRepository = new TypeOrmDeleteRoleRepository();
    const dbDeleteRole = new DbDeleteRole(
        deleteRoleRepository
    );
    const singleIdDtoMapper = new SingleIdDtoMapperService();
    
    return new DeleteRoleController(
        dbDeleteRole,
        singleIdDtoMapper
    );
};