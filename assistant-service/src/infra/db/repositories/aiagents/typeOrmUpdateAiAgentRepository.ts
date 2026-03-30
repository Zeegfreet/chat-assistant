import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { UpdateAiAgentRepository } from "@domain/index";
import { AiAgents } from "@src/entitys/ai.agents.entity";

export class TypeOrmUpdateAiAgentRepository implements UpdateAiAgentRepository {
    private mapper = DbErrorMapper;
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(AiAgents);
    }
    async update(id: UpdateAiAgentRepository.Id, payload: UpdateAiAgentRepository.Payload): Promise<UpdateAiAgentRepository.Result> {
        try {
            
            const aiAgentToUpdate = await this.repository.findOneBy({ id });
            if(!aiAgentToUpdate) throw new NotFoundError("Ai Agent not found with received id.");
            const toUpdateAiAgent = { ...aiAgentToUpdate, ...payload };
            const updateAiAgent = await this.repository.save(toUpdateAiAgent);
            return updateAiAgent;
        } catch (error) {
            const errorMapped = this.mapper.map(error);
            if(errorMapped.kind === "conflict"){
                throw new AlreadyExistsError("Already exists ai agent with de received name or slug");
            }

            throw error;
        }
    }

}