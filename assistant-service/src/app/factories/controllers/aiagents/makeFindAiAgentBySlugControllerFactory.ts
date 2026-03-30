import { makeDbFindBySlugAiAgentFactory } from "@app/factories/useCases/aiagents/makeDbFindBySlugAiAgentFactory";
import { FindAiAgentBySlugController } from "@presentation/controllers";

export const makeFindAiAgentBySlugControllerFactory = () => {
    const  findBySlug = makeDbFindBySlugAiAgentFactory();
    return new FindAiAgentBySlugController(
        findBySlug
    );
};