import { makeDbUpdateAiAgentFactory } from "@app/factories/useCases/aiagents/makeDbUpdateAiAgentFactory";
import { UpdateAiAgentController } from "@presentation/controllers";

export const makeUpdateAiAgentControllerFactory = () => {
    const updatePrompt = makeDbUpdateAiAgentFactory();
    return new UpdateAiAgentController(
        updatePrompt
    );
};