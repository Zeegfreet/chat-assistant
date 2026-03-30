import { DbConnection } from "@db/db/config/dbConnection";
import { SearchHelper } from "@db/db/protocols/searchHelper";
import { SearchAiAgentRepository } from "@domain/index";
import { AiAgents } from "@src/entitys/ai.agents.entity";
import { Repository } from "typeorm";

export class TypeOrmSearchAiAgentRepository implements SearchAiAgentRepository {

    constructor(
        private readonly searchHelper: SearchHelper
    ){}

    private get repository(): Repository<AiAgents> {
        return DbConnection
            .getInstance()
            .getCollection(AiAgents);
    }

    async list(params: SearchAiAgentRepository.Params): Promise<SearchAiAgentRepository.Result> {
        const qb =  this.repository.createQueryBuilder();
        // .select("id, resource, method, createdAt, updatedAt");
        const [aiAgents, count] = await this.searchHelper
            .apply(qb, params)
            .getManyAndCount();
        return {
            totalPages: Math.ceil(count / Number(params.limit)) || 1,
            currentPage: Number(params.page) || 1,
            data: aiAgents
        };
    }
    
}