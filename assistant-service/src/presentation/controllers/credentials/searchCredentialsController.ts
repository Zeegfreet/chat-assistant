import { SearchCredentials } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SearchDtoMapper } from "@presentation/mappers/dtos/searchDtoMapper";
import { Controller } from "@presentation/protocols/controller";

export class SearchCredentialController implements Controller {

    constructor(
        private readonly searchCredentials: SearchCredentials,
        private readonly dtoMapper: SearchDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const params = req.query;
            const dto = this.dtoMapper.to_dto(params);
            const permissions = await this.searchCredentials.list(dto);
            return onSearch(permissions);
        } catch (error) {
            return errorHandler(error);
        }
    }

}