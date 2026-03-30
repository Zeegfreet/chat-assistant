import { DbAddPrompt } from "@data/useCases";
import { TypeOrmAddPromptRepository } from "@db/db/repositories";

export const makeDbAddPromptFactory = () => {
    const addPromptRepository = new TypeOrmAddPromptRepository();
    return new DbAddPrompt(
        addPromptRepository
    );
};