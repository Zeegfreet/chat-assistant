import { makeDbSearchPromptFactory } from "@app/factories/useCases/prompts/makeDbSearchPromptFactory";
import { SearchPromptsController } from "@presentation/controllers";
import { SearchDtoMapperService } from "@presentation/mappers/dtos/searchDtoMapperService";

export const makeSearchPromptsControllerFactory = () => {
    const searchPrompts = makeDbSearchPromptFactory();
    const searchDtoMapper = new SearchDtoMapperService();
    return new SearchPromptsController(
        searchPrompts,
        searchDtoMapper
    );
};