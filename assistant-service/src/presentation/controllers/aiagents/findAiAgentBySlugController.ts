import { FindAiAgentBySlug } from "@domain/index";
import { errorHandler, onSearch } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class FindAiAgentBySlugController implements Controller {

    constructor(
        private readonly findBySlug: FindAiAgentBySlug
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const { slug } = req.params;
            const aiAgent = await this.findBySlug.findBySlug(slug);
            return onSearch(aiAgent);
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}