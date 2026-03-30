import { DbConnection } from "@db/db/config/dbConnection";
import { FindAiAgentBySlugRepository } from "@domain/index";
import { AiAgents } from "@src/entitys/ai.agents.entity";

export class TypeOrmFindAiAgentBySlugRepository implements FindAiAgentBySlugRepository {
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(AiAgents);
    }
    async findBySlug(slug: FindAiAgentBySlugRepository.Slug): Promise<FindAiAgentBySlugRepository.Result> {
        const aiAgent = await this.repository.findOne({ where: { slug } });
        return aiAgent;
    }
    
}