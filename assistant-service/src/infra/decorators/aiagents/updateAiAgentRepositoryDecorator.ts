import { MemoryDeleteAiAgentRepository, UpdateAiAgentRepository } from "@domain/index";

export class UpdateAiAgentRepositoryDecorator implements UpdateAiAgentRepository {
    constructor(
        private readonly memoryDeleteAiAgentRepository: MemoryDeleteAiAgentRepository,
        private readonly updateAiAgentRepository: UpdateAiAgentRepository,
    ){}
    async update(id: UpdateAiAgentRepository.Id, payload: UpdateAiAgentRepository.Payload): Promise<UpdateAiAgentRepository.Result> {
        const updatedAiAgent = await this.updateAiAgentRepository.update(id, payload);

        await this.memoryDeleteAiAgentRepository.delete(updatedAiAgent.slug);

        return updatedAiAgent;
    }

}