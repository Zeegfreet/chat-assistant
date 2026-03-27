import { dbUpdateUserFactory } from "@app/factories/useCases/user/dbUpdateUserFactory";
import { UpdateUserCotroller } from "@presentation/controllers/user/updateUserController";

export const makeUpdateUserControllerFactory = () => {

    const dbUpdateUser = dbUpdateUserFactory();
    
    return new UpdateUserCotroller( dbUpdateUser );
};