import { DbConnection } from "@db/db/config/dbConnection";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { DeleteAiAgentRepository } from "@domain/index";
import { AiAgents } from "@src/entitys/ai.agents.entity";

export class TypeOrmDeleteAiAgentRepositroy implements DeleteAiAgentRepository {

    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(AiAgents);
    }

    async delete(id: DeleteAiAgentRepository.Id): Promise<DeleteAiAgentRepository.Result> {
        if(!id) throw new ValidationError("The received id must be a number");
        const aiAgentToDelete = await this.repository.findOneBy({ id });
        if(!aiAgentToDelete) throw new NotFoundError("Ai Agent not found with received id.");
        await this.repository.remove(aiAgentToDelete);
    }
    
}