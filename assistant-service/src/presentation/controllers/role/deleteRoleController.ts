import { DeleteRole } from "@domain/index";
import { errorHandler, onSuccessNoBody } from "@presentation/httpResponse/httpResponse";
import { SingleIdDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";

export class DeleteRoleController implements Controller{

    constructor(
        private readonly deleteRole: DeleteRole,
        private readonly dtoMapper: SingleIdDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.params;
            const { id } = this.dtoMapper.to_dto(raw);
            await this.deleteRole.delete(id);
            return onSuccessNoBody();
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}