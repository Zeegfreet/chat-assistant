import { DbMassDeletePermission } from "@data/useCases/permission/dbMassDeletePermission";
import { TypeOrmListPermissionRepository, TypeOrmMassDeletePermissionRepository } from "@db/db/repositories";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";
import { MassDeletePermissionControlelr } from "@presentation/controllers/permission/massDeletePermissionController";
import { MassIdsDtoMapperService } from "@presentation/mappers/dtos/massIdsDtomapperService";

export const makeMassDeletePermissionControllerFactory = () => {
    const dtoMapper = new MassIdsDtoMapperService();
    const massDeletePermissionRepository = new TypeOrmMassDeletePermissionRepository();
    const searchHeleper = new TypeOrmSearchHelper(
        ["id"],
        ["id"],
        ["id"]
    );
    const listPermissionRepository = new TypeOrmListPermissionRepository(searchHeleper);

    const dbMassDeletePermission = new DbMassDeletePermission(
        massDeletePermissionRepository,
        listPermissionRepository
    );
    return new MassDeletePermissionControlelr(
        dbMassDeletePermission,
        dtoMapper
    );
};