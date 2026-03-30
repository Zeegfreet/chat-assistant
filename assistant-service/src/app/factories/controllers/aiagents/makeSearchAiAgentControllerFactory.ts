import { makeDbSearchAiAgentFactory } from "@app/factories/useCases/aiagents/makeDbSearchAiAgentFactory";
import { SearchAiAgentController } from "@presentation/controllers";
import { SearchDtoMapperService } from "@presentation/mappers/dtos/searchDtoMapperService";

export const makeSearchAiAgentControllerFactory = () => {
    const searchAiAgents = makeDbSearchAiAgentFactory();
    const searchDtoMapper = new SearchDtoMapperService();
    return new SearchAiAgentController(
        searchAiAgents,
        searchDtoMapper
    );
};