import { AddPermission } from "@domain/index";
import { errorHandler, onCreate } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class AddPermissionController implements Controller {

    constructor(
        private readonly addPermission: AddPermission
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const dto = req.body;
            
            const response = await this.addPermission.add(dto);

            const presenter = this.toPresenter(response);

            return onCreate(presenter);
        
        } catch (error) {
            return errorHandler(error);
        }
    }

    private toPresenter(permission: AddPermission.Result){
        return {
            id: permission.id,
            resource: permission.resource,
            method: permission.method,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
        };
    }

}