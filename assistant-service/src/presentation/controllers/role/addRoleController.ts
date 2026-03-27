import { AddRole } from "@domain/index";
import { errorHandler, onCreate } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class AddRoleController implements Controller {

    constructor(
        private readonly addPermission: AddRole
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;

            const dto = this.toDto(raw);
                            
            const response = await this.addPermission.add(dto);

            const presenter = this.toPresenter(response);

            return onCreate(presenter);
        
        } catch (error) {
            return errorHandler(error);
        }
    }

    private toDto(raw: any): AddRole.Params{
        let dto: AddRole.Params = {
            role: raw.role.trim(),
            description: raw.description.trim(),
        };

        if(raw.isActive !== undefined){
            dto = {
                ...dto,
                isActive: Boolean(raw.isActive)
            };
        }

        if(raw.isDefault != undefined){
            dto = {
                ...dto,
                isDefault: Boolean(raw.isDefault)
            };
        }

        if(raw.permissions){
            dto = {
                ...dto,
                permissions: raw.permissions
            };
        }
        return dto;
    }

    private toPresenter(role: AddRole.Result){
        return {
            id: role.id,
            role: role.role,
            description: role.description,
            isDefault: role.isDefault,
            isActive: role.isActive,
            permissions: role.permissions.map(permission => ({
                id: permission.id,
                resource: permission.resource,
                method: permission.method
            })),
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
        };
    }

}