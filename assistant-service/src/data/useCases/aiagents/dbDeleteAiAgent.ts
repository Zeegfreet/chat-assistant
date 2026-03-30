import { DeleteAiAgent, DeleteAiAgentRepository } from "@domain/index";

export class DbDeleteAiAgent implements DeleteAiAgent {

    constructor(
        private readonly deleteAiAgentRepository: DeleteAiAgentRepository
    ){}

    async delete(id: DeleteAiAgent.Id): Promise<DeleteAiAgent.Result> {
        await this.deleteAiAgentRepository.delete(id);
    }

}