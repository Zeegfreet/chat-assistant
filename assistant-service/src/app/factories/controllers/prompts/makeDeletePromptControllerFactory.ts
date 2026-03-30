import { makeDbDeletePromptFactory } from "@app/factories/useCases/prompts/makeDbDeletePromptFactory";
import { DeletePromptController } from "@presentation/controllers";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeDeletePromptControllerFactory = () => {
    const deletePrompt = makeDbDeletePromptFactory();
    const signleIdDtoMapper = new SingleIdDtoMapperService();
    return new DeletePromptController(
        deletePrompt,
        signleIdDtoMapper
    );
};