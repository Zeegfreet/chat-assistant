import { makeListPermissionFactory } from "@app/factories/useCases/permission/makeListPermissionFactory";
import { ListPermissionController } from "@presentation/controllers/permission/listPermissionController";
import { SearchDtoMapperService } from "@presentation/mappers/dtos/searchDtoMapperService";

export const makeListPermissionControllerFactory = () => {
    const dtoMapper = new SearchDtoMapperService();
    const listPermission = makeListPermissionFactory();
    return new ListPermissionController(
        listPermission,
        dtoMapper
    );
};