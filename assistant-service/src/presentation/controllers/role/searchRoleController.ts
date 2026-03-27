import { SearchRole } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SearchDtoMapper } from "@presentation/mappers/dtos/searchDtoMapper";
import { Controller } from "@presentation/protocols/controller";

export class SearchRoleController implements Controller {

    constructor(
        private readonly searchRole: SearchRole,
        private readonly dtoMapper: SearchDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const params = req.query;
            const dto = this.dtoMapper.to_dto(params);
            const roles = await this.searchRole.list(dto);
            return onSearch(roles);
        } catch (error) {
            return errorHandler(error);
        }
    }

}