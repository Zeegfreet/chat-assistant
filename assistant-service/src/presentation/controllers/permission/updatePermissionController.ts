import { UpdatePermission } from "@domain/useCases/permission/updatePermission";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class UpdatePermissionController implements Controller{

    constructor(
        private readonly updatePermission: UpdatePermission,
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;
            const rawPk = req.params;

            const payload = this.to_dto(raw);
            const pk = this.to_pk(rawPk);

            const updatedPermission = await this.updatePermission.update(pk, payload);

            return onSuccess(updatedPermission);
            
        } catch (error) {
            return errorHandler(error);
        }
    }

    to_dto(raw: any): UpdatePermission.Payload{
        let dto = {} as UpdatePermission.Payload;

        if(raw.resource){
            if(typeof raw.resource === "string"){
                dto = {
                    ...dto,
                    resource: raw.resource.trim()
                };
            }
        }

        if(raw.method){
            if(typeof raw.method === "string"){
                dto = {
                    ...dto,
                    method: raw.method.trim()
                };
            }
        }

        return dto;
    }

    to_pk(raw: any): UpdatePermission.Id{
        return Number(raw.id);
    }

}