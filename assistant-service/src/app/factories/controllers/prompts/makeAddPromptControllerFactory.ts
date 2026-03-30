import { makeDbAddPromptFactory } from "@app/factories/useCases/prompts/makeDbAddPromptFactory";
import { AddPromptController } from "@presentation/controllers";

export const makeAddPromptControllerFactory = () => {
    const addPrompt = makeDbAddPromptFactory();
    return new AddPromptController(addPrompt);
};