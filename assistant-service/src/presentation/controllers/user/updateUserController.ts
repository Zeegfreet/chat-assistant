import { UpdateUser } from "@domain/index";
import { onSuccess, errorHandler } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@presentation/protocols/http";

export class UpdateUserCotroller implements Controller {
    constructor(
        private readonly dbUpdateUser: UpdateUser
    ){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const rawData = req.body;
            const params = req.params;
            const requesterId = req.context.user?.id;

            const { id } = this.idToDto(params);

            const dto = this.payloadToDto(rawData);

            const response = await this.dbUpdateUser.update(id, dto, requesterId);

            const presenter = this.toPresenter(response);

            return onSuccess(presenter);

        } catch (error) {
            return errorHandler(error);
        }
    }

    private idToDto(raw: any){
        return {
            id: Number(raw.id)
        };
    }

    private payloadToDto(raw: any): UpdateUser.Params {
        const dto: UpdateUser.Params = {};
        const keys = Object.keys(raw);

        if(keys.includes("name")){
            dto.name = raw.name.trim();
        }
        if(keys.includes("email")){
            dto.email = raw.email.trim();
        }
        if(keys.includes("password")){
            dto.password = raw.password;
        }
        if(keys.includes("isActive")){
            dto.isActive = Boolean(raw.isActive);
        }
        if(keys.includes("isAdmin")){
            dto.isAdmin = Boolean(raw.isAdmin);
        }
        if(keys.includes("isBlocked")){
            dto.isBlocked = Boolean(raw.isBlocked);
        }
        if(keys.includes("isVerified")){
            dto.isVerified = Boolean(raw.isVerified);
        }
        if(keys.includes("roles")){
            dto.roles = raw.roles;
        }

        return dto;
        
    }

    private toPresenter(raw: UpdateUser.Result) {
        return {
            id: raw.id,
            name: raw.name,
            email: raw.email,
            isActive: raw.isActive,
            isAdmin: raw.isAdmin,
            isBlocked: raw.isBlocked,
            isVerified: raw.isVerified,
            roles: raw.roles,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt
        };
    }
    
}