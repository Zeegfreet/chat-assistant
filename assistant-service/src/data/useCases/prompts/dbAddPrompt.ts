import { AddPrompt, AddPromptRepository } from "@domain/index";

export class DbAddPrompt implements AddPrompt {
    constructor(
        private readonly addPrompt: AddPromptRepository
    ){}
    async add(payload: AddPrompt.Params): Promise<AddPrompt.Result> {

        const createdPrompt = await this.addPrompt.add(payload);
        
        return createdPrompt;
    }

}