import { dbDeleteUserFactory } from "@app/factories/useCases/user/dbDeleteUserFactory";
import { DeleteUserController } from "@presentation/controllers/user/deleteUserController";

export const makeDeleteUserControllerFactory = () => {
    const dbDeleteUser = dbDeleteUserFactory();
    return new DeleteUserController(dbDeleteUser);
};