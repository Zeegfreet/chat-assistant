import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindAiAgentByPk, FindAiAgentByPkRepository } from "@domain/index";

export class DbFindAiAgentByPk implements FindAiAgentByPk {

    constructor(
        private readonly findAiAgentByPkRepository: FindAiAgentByPkRepository
    ){}

    async findById(id: FindAiAgentByPk.Id): Promise<FindAiAgentByPk.Result> {
        const aiAgent = await this.findAiAgentByPkRepository.findById(id);
        if(!aiAgent) throw new NotFoundError("Not found ai agent with received id.");
        return aiAgent;
    }

}