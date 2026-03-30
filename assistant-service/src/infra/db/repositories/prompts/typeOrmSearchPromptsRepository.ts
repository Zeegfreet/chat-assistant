import { DbConnection } from "@db/db/config/dbConnection";
import { SearchHelper } from "@db/db/protocols/searchHelper";
import { SearchPromptRepository } from "@domain/index";
import { Prompts } from "@src/entitys/prompts.entity";
import { Repository } from "typeorm";

export class TypeOrmSearchPromptsRepository implements SearchPromptRepository {

    constructor(
        private readonly searchHelper: SearchHelper
    ){}

    private get repository(): Repository<Prompts> {
        return DbConnection
            .getInstance()
            .getCollection(Prompts);
    }

    async list(params: SearchPromptRepository.Params): Promise<SearchPromptRepository.Result> {
        const qb =  this.repository.createQueryBuilder();
        // .select("id, resource, method, createdAt, updatedAt");
        const [prompts, count] = await this.searchHelper
            .apply(qb, params)
            .getManyAndCount();
        return {
            totalPages: Math.ceil(count / Number(params.limit)) || 1,
            currentPage: Number(params.page) || 1,
            data: prompts
        };
    }
    
}