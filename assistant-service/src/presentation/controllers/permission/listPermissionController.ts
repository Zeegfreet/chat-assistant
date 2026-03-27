import { ListPermission } from "@domain/useCases/permission/listPermission";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SearchDtoMapper } from "@presentation/mappers/dtos/searchDtoMapper";
import { Controller } from "@presentation/protocols/controller";

export class ListPermissionController implements Controller {

    constructor(
        private readonly listPermission: ListPermission,
        private readonly dtoMapper: SearchDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const params = req.query;
            const dto = this.dtoMapper.to_dto(params);
            const permissions = await this.listPermission.list(dto);
            return onSearch(permissions);
        } catch (error) {
            return errorHandler(error);
        }
    }

}