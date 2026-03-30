import { FindCredentialByPk } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SingleIdDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";

export class FindCredentialByPkController implements Controller {

    constructor(
        private readonly dtoMapper: SingleIdDtoMapper,
        private readonly findById: FindCredentialByPk
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.params;
            const { id } = this.dtoMapper.to_dto(raw);
            const credential = await this.findById.findById(id);
            return onSearch(credential);
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}