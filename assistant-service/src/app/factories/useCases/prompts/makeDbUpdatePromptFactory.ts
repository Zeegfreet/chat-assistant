import { DbUpdatePrompt } from "@data/useCases";
import { TypeOrmUpdatePromptRepository } from "@db/db/repositories";

export const makeDbUpdatePromptFactory = () => {
    const updatePromptRepository = new TypeOrmUpdatePromptRepository();
    return new DbUpdatePrompt(
        updatePromptRepository
    );
};