import { makeDbUpdatePromptFactory } from "@app/factories/useCases/prompts/makeDbUpdatePromptFactory";
import { UpdatePromptController } from "@presentation/controllers";

export const makeUpdatePromptControllerFactory = () => {
    const updatePrompt = makeDbUpdatePromptFactory();
    return new UpdatePromptController(
        updatePrompt
    );
};