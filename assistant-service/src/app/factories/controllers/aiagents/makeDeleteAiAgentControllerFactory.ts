
import { makeDeleteAiAgentFactory } from "@app/factories/useCases/aiagents/makeDbDeleteAiAgentFactory";
import { DeleteAiAgentController } from "@presentation/controllers";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeDeleteAiAgentControllerFactory = () => {
    const deleteAiAgent = makeDeleteAiAgentFactory();
    const signleIdDtoMapper = new SingleIdDtoMapperService();
    return new DeleteAiAgentController(
        deleteAiAgent,
        signleIdDtoMapper
    );
};