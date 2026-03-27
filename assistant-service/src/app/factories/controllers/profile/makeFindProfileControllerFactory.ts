import { DbFindProfileByPk } from "@data/useCases";
import { TypeOrmFindUserByPkRepository } from "@db/db/repositories";
import { FindProfileController } from "@presentation/controllers/profile/findProfileController";

export const makeFindProfileControllerFactory = () => {
    const findUserByPkRepository = new TypeOrmFindUserByPkRepository();
    const findProfileByPk = new DbFindProfileByPk(
        findUserByPkRepository
    );
    return new FindProfileController(
        findProfileByPk
    );
};