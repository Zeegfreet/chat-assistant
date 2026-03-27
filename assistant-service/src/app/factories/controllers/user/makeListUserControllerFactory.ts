import { dbListUsersFactory } from "@app/factories/useCases/user/dbListUsersFactory";
import { ListUserController } from "@presentation/controllers/user/listUserController";

export const makeListUserControllerFactory = () => {
    const dbListUsers = dbListUsersFactory();
    return new ListUserController(dbListUsers);
};