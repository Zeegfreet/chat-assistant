import { UpdateRole } from "@domain/index";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class UpdateRoleController implements Controller{

    constructor(
        private readonly updateRole: UpdateRole,
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;
            const rawPk = req.params;

            const payload = this.to_dto(raw);
            const pk = this.to_pk(rawPk);

            const updatedPermission = await this.updateRole.update(pk, payload);

            return onSuccess(updatedPermission);
            
        } catch (error) {
            return errorHandler(error);
        }
    }

    to_dto(raw: any): UpdateRole.Payload{
        const keys = Object.keys(raw);
        const dto = {} as UpdateRole.Payload;

        if(keys.includes("role")){
            dto.role = raw.role.trim();
        }

        if(keys.includes("description")){
            dto.description = raw.description.trim();
        }

        if(keys.includes("isActive")){
            dto.isActive = Boolean(raw.isActive);
        }

        if(keys.includes("isDefault")){
            dto.isDefault = Boolean(raw.isDefault);
        }

        if(keys.includes("permissions")){
            dto.permissions = raw.permissions;
        }

        return dto;
    }

    to_pk(raw: any): UpdateRole.Id{
        return Number(raw.id);
    }

}