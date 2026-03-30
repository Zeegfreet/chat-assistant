import { DbConnection } from "@db/db/config/dbConnection";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { DeletePromptRepository } from "@domain/index";
import { Prompts } from "@src/entitys/prompts.entity";

export class TypeOrmDeletePromptRepository implements DeletePromptRepository {

    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Prompts);
    }

    async delete(id: DeletePromptRepository.Id): Promise<DeletePromptRepository.Result> {
        if(!id) throw new ValidationError("The received id must be a number");
        const promptToDelete = await this.repository.findOneBy({ id });
        if(!promptToDelete) throw new NotFoundError("Prompts not found with received id.");
        await this.repository.remove(promptToDelete);
    }
    
}