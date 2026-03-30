import { DeleteAiAgent } from "@domain/index";
import { errorHandler, onSuccessNoBody } from "@presentation/httpResponse/httpResponse";
import { SingleIdDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";

export class DeleteAiAgentController implements Controller {

    constructor(
        private readonly deleteAiAgent: DeleteAiAgent,
        private readonly singleIdDtoMapper: SingleIdDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.params;
            const { id } = this.singleIdDtoMapper.to_dto(raw);

            await this.deleteAiAgent.delete(id);
            return onSuccessNoBody();
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}