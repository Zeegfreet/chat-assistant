import { DbConnection } from "@db/db/config/dbConnection";
import { FindPromptByPkRepository } from "@domain/index";
import { Prompts } from "@src/entitys/prompts.entity";

export class TypeOrmFindPromptByPkRepository implements FindPromptByPkRepository{
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Prompts);
    }
    async findById(id: FindPromptByPkRepository.Id): Promise<FindPromptByPkRepository.Result> {
        const prompt = await this.repository.findOne({ where: { id } });
        return prompt;
    }
    
}