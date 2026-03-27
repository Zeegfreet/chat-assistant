import { dbFindUserByPkFactory } from "@app/factories/useCases/user/dbFindByPkFactory";
import { FindUserByPkController } from "@presentation/controllers/user/findUserByPkController";
import { SingleIdDtoMapperService } from "@src/presentation/mappers";

export const makeFindUserByPkControllerFactory = () => {
    const dbFindUserByPk = dbFindUserByPkFactory();
    const singleIdDtoMapper = new SingleIdDtoMapperService();

    return new FindUserByPkController(singleIdDtoMapper, dbFindUserByPk);
};