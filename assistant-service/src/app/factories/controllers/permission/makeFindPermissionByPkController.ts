import { DbFindPermissionByPk } from "@data/useCases/permission/dbFindPermissionByPk";
import { TypeOrmFindPermissionByPkRepository } from "@db/db/repositories/permission/typeOrmFindPermissionByPkRepository";
import { FindPermissionByPkController } from "@presentation/controllers/permission/findPermissionByPkController";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeFindPermissionByPkControllerFactory = () => {

    const singleIdDtoMapper = new SingleIdDtoMapperService();

    const findPermissionByPkRepository = new TypeOrmFindPermissionByPkRepository();
    const dbFindPermissionById = new DbFindPermissionByPk(
        findPermissionByPkRepository
    );

    return new FindPermissionByPkController(
        singleIdDtoMapper,
        dbFindPermissionById
    );
};