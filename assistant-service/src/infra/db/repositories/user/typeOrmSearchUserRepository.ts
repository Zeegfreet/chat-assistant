import { DbConnection } from "@db/db/config/dbConnection";
import { SearchHelper } from "@db/db/protocols/searchHelper";
import { SearchUserRepository } from "@domain/index";
import { User } from "@src/entitys/user.entity";
import { Repository } from "typeorm";

export class TypeOrmSearchUserRepository implements SearchUserRepository {

    constructor(
        private readonly searchHelper: SearchHelper
    ){}

    private get repository(): Repository<User> {
        return DbConnection
            .getInstance()
            .getCollection(User);
    }

    async search(params: SearchUserRepository.Params): Promise<SearchUserRepository.Result> {
        const qb =  this.repository.createQueryBuilder()
            .select([ "User.id", "User.name", "User.email", "User.isActive", "User.isAdmin", "User.isBlocked", "User.isVerified", "User.createdAt", "User.updatedAt"]);

        const [users, count] = await this.searchHelper
            .apply(qb, params)
            .getManyAndCount();

        return {
            totalPages: Math.ceil(count / Number(params.limit)) || 1,
            currentPage: Number(params.page) || 1,
            data: users
        };
    }
    
}