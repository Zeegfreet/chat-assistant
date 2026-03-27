import { SearchUser } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { SearchDtoMapper } from "@presentation/mappers/dtos/searchDtoMapper";
import { Controller } from "@presentation/protocols/controller";

export class SearchUserController implements Controller {

    constructor(
        private readonly searchUser: SearchUser,
        private readonly dtoMapper: SearchDtoMapper
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const params = req.query;
            const dto = this.dtoMapper.to_dto(params);
            const roles = await this.searchUser.search(dto);
            return onSearch(roles);
        } catch (error) {
            return errorHandler(error);
        }
    }

    // toPresenter(raw: SearchUser.Result){
    //     return {
    //         id: raw.id,
    //         name: raw.name,
    //         email: raw.email,
    //         isActive: raw.isActive,
    //         isAdmin: raw.isAdmin,
    //         isBlocked: raw.isBlocked,
    //         isVerified: raw.isVerified,
    //         roles: raw.roles,
    //         createdAt: raw.createdAt,
    //         updatedAt: raw.updatedAt,
    //     };
    // }

}