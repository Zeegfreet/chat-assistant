import { DbConnection } from "@db/db/config/dbConnection";
import { FindAiAgentByPkRepository } from "@domain/index";
import { AiAgents } from "@src/entitys/ai.agents.entity";

export class TypeOrmFindAiAgentByPkRepository implements FindAiAgentByPkRepository{
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(AiAgents);
    }
    async findById(id: FindAiAgentByPkRepository.Id): Promise<FindAiAgentByPkRepository.Result> {
        const aiAgent = await this.repository.findOne({ where: { id }, relations: {
            credentials: true
        } });
        return aiAgent;
    }
    
}