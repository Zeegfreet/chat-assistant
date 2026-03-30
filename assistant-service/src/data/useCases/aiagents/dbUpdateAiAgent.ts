import { UpdateAiAgentRepository, UpdateAiAgent } from "@domain/index";

export class DbUpdateAiAgent implements UpdateAiAgent {
    constructor(
        private readonly updateAiAgentRepository: UpdateAiAgentRepository
    ){}
    async update(id: UpdateAiAgent.Id, payload: UpdateAiAgent.Payload): Promise<UpdateAiAgent.Result> {
      
        const updatedData = await this.updateAiAgentRepository.update(id, payload);
        return updatedData;
    }
}