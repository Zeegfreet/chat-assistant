import { MassDeletePermission } from "@domain/index";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { MassIdsDtoMapper } from "@presentation/mappers/dtos/massIdsDto";
import { Controller } from "@presentation/protocols/controller";

export class MassDeletePermissionControlelr implements Controller{
    constructor(
        private readonly massDelete: MassDeletePermission,
        private readonly dtoMapper: MassIdsDtoMapper
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;
            const dto = this.dtoMapper.to_dto(raw);
            const deletedItems = await this.massDelete.delete(dto);
            return onSuccess(deletedItems);
        } catch (error) {
            return errorHandler(error);
        }
    }

}