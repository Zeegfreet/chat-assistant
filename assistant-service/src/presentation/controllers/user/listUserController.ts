import { ListUsers } from "@domain/index";
import { onSearch, errorHandler } from "@presentation/httpResponse/httpResponse";
import { UserPresenterMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@presentation/protocols/http";

export class ListUserController implements Controller {
    constructor(
        private readonly dbListUsers: ListUsers
    ){}
    async handle(_req: HttpRequest): Promise<HttpResponse> {
        try {
            const listUsers = await this.dbListUsers.list();
            const presenter = this.toPresenters(listUsers);
            return onSearch(presenter);
        } catch (error) {
            return errorHandler(error);
        }
    }

    toPresenter(raw: ListUsers.Result){
        return {
            id: raw.id,
            name: raw.name,
            email: raw.email,
            isActive: raw.isActive,
            isAdmin: raw.isAdmin,
            isBlocked: raw.isBlocked,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        };
    }

    toPresenters(raw: ListUsers.Result[]){
        return raw.map(user => this.toPresenter(user));
    }
    
}