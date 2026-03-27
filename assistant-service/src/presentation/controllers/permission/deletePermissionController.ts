import { DeletePermission } from "@domain/useCases/permission/deletePermission";
import { errorHandler, onSuccessNoBody } from "@presentation/httpResponse/httpResponse";
import { SingleIdDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";

export class DeletePermissionController implements Controller{

    constructor(
        private readonly deletePermission: DeletePermission,
        private readonly dtoMapper: SingleIdDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.params;
            const { id } = this.dtoMapper.to_dto(raw);

            await this.deletePermission.delete(id);
            return onSuccessNoBody();
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}