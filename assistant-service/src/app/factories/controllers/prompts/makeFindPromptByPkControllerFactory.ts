import { makeDbFindPromptByPkFactory } from "@app/factories/useCases/prompts/makeDbFindPromptByPkFactory";
import { FindPromptByPkController } from "@presentation/controllers";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeFindPromptByPkControllerFactory = () => {
    const singleIdDtoMapper = new SingleIdDtoMapperService();
    const  findPromptByPk = makeDbFindPromptByPkFactory();
    return new FindPromptByPkController(
        singleIdDtoMapper,
        findPromptByPk
    );
};