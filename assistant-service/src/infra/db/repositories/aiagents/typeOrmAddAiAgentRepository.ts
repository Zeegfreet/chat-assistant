import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { AddAiAgentRepository } from "@domain/index";
import { AiAgents } from "@src/entitys/ai.agents.entity";

export class TypeOrmAddAiAgentRepository implements AddAiAgentRepository {

    private dbErrorMapper = DbErrorMapper;

    private get repository() {
        return DbConnection
            .getInstance()
            .getCollection(AiAgents);
    }

    async add(payload: AddAiAgentRepository.Params): Promise<AddAiAgentRepository.Result> {
        try {
            
            const aiAgentToSave = this.repository.create(payload);

            const savedAiAgent =  await this.repository.save(aiAgentToSave);
            return {
                ...savedAiAgent
            };
        } catch (err) {
            const mappedError = this.dbErrorMapper.map(err);
            if(mappedError.kind === "conflict"){
                throw new AlreadyExistsError("Already exists a promt with the received name.");
            }
            throw err;
        }
    }
}