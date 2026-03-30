import { UpdatePrompt, UpdatePromptRepository } from "@domain/index";

export class DbUpdatePrompt implements UpdatePrompt {
    constructor(
        private readonly updatePromptRepository: UpdatePromptRepository
    ){}
    async update(id: UpdatePrompt.Id, payload: UpdatePrompt.Payload): Promise<UpdatePrompt.Result> {
      
        const updatedData = await this.updatePromptRepository.update(id, payload);
        return updatedData;
    }
}