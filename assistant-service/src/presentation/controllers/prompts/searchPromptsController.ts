import { SearchPrompt } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SearchDtoMapper } from "@presentation/mappers/dtos/searchDtoMapper";
import { Controller } from "@presentation/protocols/controller";

export class SearchPromptsController implements Controller {

    constructor(
        private readonly searchPrompts: SearchPrompt,
        private readonly dtoMapper: SearchDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const params = req.query;
            const dto = this.dtoMapper.to_dto(params);
            const prompts = await this.searchPrompts.list(dto);
            return onSearch(prompts);
        } catch (error) {
            return errorHandler(error);
        }
    }

}