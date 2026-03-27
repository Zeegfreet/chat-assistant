import { FindUserByPk } from "@domain/index";
import { onSuccess, errorHandler } from "@presentation/httpResponse/httpResponse";
import { SingleIdDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@presentation/protocols/http";

export class FindUserByPkController implements Controller {
    constructor(
        private readonly idDtoMapper: SingleIdDtoMapper,
        private readonly findUserByPk: FindUserByPk
    ){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const raw = req.params;

            const { id } = this.idDtoMapper.to_dto(raw);
            
            const response = await this.findUserByPk.find(id);

            const presenter = this.toPresenter(response);
            
            return onSuccess(presenter);
        } catch (error) {
            return errorHandler(error);
        }
    }

    toPresenter(raw: FindUserByPk.Result){
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
            updatedAt: raw.updatedAt,
        };
    }
    
}