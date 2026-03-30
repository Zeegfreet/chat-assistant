import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindPromptByPk, FindPromptByPkRepository } from "@domain/index";

export class DbFindPromptByPk implements FindPromptByPk {

    constructor(
        private readonly findPromptByPkRepository: FindPromptByPkRepository
    ){}

    async findById(id: FindPromptByPk.Id): Promise<FindPromptByPk.Result> {
        const prompt = await this.findPromptByPkRepository.findById(id);
        if(!prompt) throw new NotFoundError("Not found prompt with received id.");
        return prompt;
    }

}