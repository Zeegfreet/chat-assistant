import { FindAiAgentByPk } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SingleIdDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";

export class FindAiAgentByPkController implements Controller {

    constructor(
        private readonly dtoMapper: SingleIdDtoMapper,
        private readonly findByPk: FindAiAgentByPk
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.params;
            const { id } = this.dtoMapper.to_dto(raw);
            const aiAgent = await this.findByPk.findById(id);
            return onSearch(aiAgent);
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}