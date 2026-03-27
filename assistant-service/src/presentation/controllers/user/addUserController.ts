import { AddUser } from "@domain/index";
import { onCreate, errorHandler } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@presentation/protocols/http";

export class AddUserController implements Controller {
    constructor(
        private readonly dbAddUser: AddUser,
    ){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const raw = req.body;
            const dto = this.toDto(raw);
            const createdUser = await this.dbAddUser.add(dto);
            const presentation = this.toPresenter(createdUser);
            return onCreate(presentation);
        } catch (error) {
            return errorHandler(error);
        }
    }

    toDto(raw: any): AddUser.Params {
        const keys = Object.keys(raw);
        const dto: AddUser.Params = {
            name: raw.name.trim(),
            email: raw.email.trim(),
            password: raw.password,
        };

        if(keys.includes("isActive")) dto.isActive = Boolean(raw.isActive);
        if(keys.includes("isAdmin")) dto.isAdmin = Boolean(raw.isAdmin);
        if(keys.includes("isBlocked")) dto.isBlocked = Boolean(raw.isBlocked);
        if(keys.includes("isVerified")) dto.isVerified = Boolean(raw.isVerified);
        if(keys.includes("roles")) dto.roles = raw.roles;

        return dto;
    }

    toPresenter(raw: AddUser.Result) {
        return {
            id: raw.id,
            name: raw.name,
            email: raw.email,
            isActive: raw.isActive,
            isAdmin: raw.isAdmin,
            isBlocked: raw.isBlocked,
            roles: raw.roles,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt
        };
    }
    
}
