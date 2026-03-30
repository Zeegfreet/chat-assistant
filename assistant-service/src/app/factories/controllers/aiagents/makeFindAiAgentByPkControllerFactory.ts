import { makeDbFindByPkAiAgentFactory } from "@app/factories/useCases/aiagents/makeDbFindByPkAiAgentFactory";
import { FindAiAgentByPkController } from "@presentation/controllers";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeFindAiAgentByPkControllerFactory = () => {
    const singleIdDtoMapper = new SingleIdDtoMapperService();
    const  findAiAgentByPk = makeDbFindByPkAiAgentFactory();
    return new FindAiAgentByPkController(
        singleIdDtoMapper,
        findAiAgentByPk
    );
};