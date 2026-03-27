import { DbSearchUser } from "@data/useCases";
import { TypeOrmSearchUserRepository } from "@db/db/repositories";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";
import { SearchUserController } from "@presentation/controllers";
import { SearchDtoMapperService } from "@presentation/mappers/dtos/searchDtoMapperService";

export const makeSearchUserControllerFactory = () => {
    const searchUserHelper = new TypeOrmSearchHelper(
        ["name", "email"],
        ["id", "name", "email", "isActive", "isAdmin", "isBlocked", "isVerified", "updatedAt", "createdAt"],
        ["id", "name", "email", "isActive", "isAdmin", "isBlocked", "isVerified", "updatedAt", "createdAt"],
    );
    const searchUserRepository = new TypeOrmSearchUserRepository(searchUserHelper);
    const dbSearchUser = new DbSearchUser(searchUserRepository);
    const searchDtoMapper = new SearchDtoMapperService();

    return new SearchUserController(
        dbSearchUser,
        searchDtoMapper
    );
};