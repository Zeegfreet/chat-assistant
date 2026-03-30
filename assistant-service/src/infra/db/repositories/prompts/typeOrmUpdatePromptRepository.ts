import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { UpdatePromptRepository } from "@domain/index";
import { Prompts } from "@src/entitys/prompts.entity";

export class TypeOrmUpdatePromptRepository implements UpdatePromptRepository{
    private mapper = DbErrorMapper;
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Prompts);
    }
    async update(id: UpdatePromptRepository.Id, payload: UpdatePromptRepository.Payload): Promise<UpdatePromptRepository.Result> {
        try {
            
            const promptToUpdate = await this.repository.findOneBy({ id });
            if(!promptToUpdate) throw new NotFoundError("Prompt not found with received id.");
            const toUpdatePrompt = { ...promptToUpdate, ...payload };
            const updatedPrompt = await this.repository.save(toUpdatePrompt);
            return updatedPrompt;
        } catch (error) {
            const errorMapped = this.mapper.map(error);
            if(errorMapped.kind === "conflict"){
                throw new AlreadyExistsError("Already exists prompt with de received name.");
            }

            throw error;
        }
    }

}