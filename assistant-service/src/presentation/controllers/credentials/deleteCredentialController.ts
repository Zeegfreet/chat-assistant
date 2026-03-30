import { DeleteCredential } from "@domain/index";
import { errorHandler, onSuccessNoBody } from "@presentation/httpResponse/httpResponse";
import { SingleIdDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";

export class DeleteCredentialController implements Controller {

    constructor(
        private readonly deleteCredential: DeleteCredential,
        private readonly singleIdDtoMapper: SingleIdDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.params;
            const { id } = this.singleIdDtoMapper.to_dto(raw);

            await this.deleteCredential.delete(id);
            return onSuccessNoBody();
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}