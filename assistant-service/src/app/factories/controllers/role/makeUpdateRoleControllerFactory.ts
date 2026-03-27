import { makeDbUpdateRoleFactory } from "@app/factories/useCases/role/makeDbUpdateRoleFactory";
import { UpdateRoleController } from "@presentation/controllers";

export const makeUpdateRoleControllerFacotory = () => {
    
    const dbUpdateRole = makeDbUpdateRoleFactory();
    return new UpdateRoleController(
        dbUpdateRole
    );
};