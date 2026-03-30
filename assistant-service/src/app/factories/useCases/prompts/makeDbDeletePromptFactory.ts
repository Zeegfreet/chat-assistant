import { DbDeletePrompt } from "@data/useCases";
import { TypeOrmDeletePromptRepository } from "@db/db/repositories";

export const makeDbDeletePromptFactory = () => {
    const deletePromptRepository = new TypeOrmDeletePromptRepository();
    return new DbDeletePrompt(
        deletePromptRepository
    );
};