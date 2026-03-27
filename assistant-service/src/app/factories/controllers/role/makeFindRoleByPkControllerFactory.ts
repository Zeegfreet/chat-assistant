import { DbFindRoleByPk } from "@data/useCases";
import { TypeOrmFindRoleByPkRepository } from "@db/db/repositories";
import { FindRoleByPkController } from "@presentation/controllers/role/findRoleByPkController";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeFindRoleByPkControllerFactory = () => {
    
    const singleIdDtoMapper = new SingleIdDtoMapperService();

    const findRoleByPkRepository = new TypeOrmFindRoleByPkRepository();
    const findRoleByPk = new DbFindRoleByPk(
        findRoleByPkRepository
    );
    
    return new FindRoleByPkController(
        singleIdDtoMapper,
        findRoleByPk
    );
};