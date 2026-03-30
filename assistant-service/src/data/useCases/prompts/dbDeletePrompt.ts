import { DeletePrompt, DeletePromptRepository } from "@domain/index";

export class DbDeletePrompt implements DeletePrompt {

    constructor(
        private readonly deletePromptRepository: DeletePromptRepository
    ){}

    async delete(id: DeletePrompt.Id): Promise<DeletePrompt.Result> {
        await this.deletePromptRepository.delete(id);
    }

}