import { SearchAiAgent } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SearchDtoMapper } from "@presentation/mappers/dtos/searchDtoMapper";
import { Controller } from "@presentation/protocols/controller";

export class SearchAiAgentController implements Controller {

    constructor(
        private readonly searchAiAgents: SearchAiAgent,
        private readonly dtoMapper: SearchDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const params = req.query;
            const dto = this.dtoMapper.to_dto(params);
            const aiAgents = await this.searchAiAgents.list(dto);
            return onSearch(aiAgents);
        } catch (error) {
            return errorHandler(error);
        }
    }

}