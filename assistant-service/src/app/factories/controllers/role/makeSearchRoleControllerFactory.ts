import { DbSearchRole } from "@data/useCases";
import { TypeOrmSearchRoleRepository } from "@db/db/repositories";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";
import { SearchRoleController } from "@presentation/controllers/role/searchRoleController";
import { SearchDtoMapperService } from "@presentation/mappers/dtos/searchDtoMapperService";

export const makeSearchRoleControllerFacotry = () => {
    const searchHelper = new TypeOrmSearchHelper(
        ["role", "description"],
        ["id", "role", "description", "isActive", "isDefault", "createdAt", "updatedAt"],
        ["id", "role", "description", "isActive", "isDefault", "createdAt", "updatedAt"],
    );
    const searchRoleRepository = new TypeOrmSearchRoleRepository(
        searchHelper
    );
    const searchRole = new DbSearchRole(searchRoleRepository);
    const dtoMapper = new SearchDtoMapperService();

    return new SearchRoleController(
        searchRole,
        dtoMapper
    );
};