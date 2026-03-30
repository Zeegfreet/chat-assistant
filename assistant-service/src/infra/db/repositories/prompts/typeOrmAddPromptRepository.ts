import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { AddPromptRepository } from "@domain/index";
import { Prompts } from "@src/entitys/prompts.entity";

export class TypeOrmAddPromptRepository implements AddPromptRepository{

    private dbErrorMapper = DbErrorMapper;

    private get repository() {
        return DbConnection
            .getInstance()
            .getCollection(Prompts);
    }

    async add(payload: AddPromptRepository.Params): Promise<AddPromptRepository.Result> {
        try {
            
            const promptToSave = this.repository.create(payload);
            const savedPrompt =  await this.repository.save(promptToSave);
            return {
                ...savedPrompt
            };
        } catch (err) {
            const mappedError = this.dbErrorMapper.map(err);
            if(mappedError.kind === "conflict"){
                throw new AlreadyExistsError("Already exists a promt with the received name.");
            }
            throw err;
        }
    }
}