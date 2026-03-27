import { dbAddUserFactory } from "@app/factories/useCases/user/dbAddUserFactory";
import { AddUserController } from "@presentation/controllers";

export const makeAddUserControllerFactory = () => {
    const dbAddUser = dbAddUserFactory();

    return new AddUserController(
        dbAddUser
    );
};