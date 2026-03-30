import { SearchPrompt, SearchPromptRepository } from "@domain/index";

export class DbSearchPrompts implements SearchPrompt {

    constructor(
        private readonly searchPromptRepository: SearchPromptRepository
    ){}

    async list(params: SearchPrompt.Params): Promise<SearchPrompt.Result> {

        if(params.limit && params.limit > 500) params.limit = 500;
        
        const prompts = await this.searchPromptRepository.list(params);
        return prompts;
    }

}