import { makeDbAddAiAgentFactory } from "@app/factories/useCases/aiagents/makeDbAddAiAgentFactory";
import { AddAiAgentController } from "@presentation/controllers";

export const makeAddAiAgentControllerFactory = () => {
    const addAiAgent = makeDbAddAiAgentFactory();
    return new AddAiAgentController(addAiAgent);
};