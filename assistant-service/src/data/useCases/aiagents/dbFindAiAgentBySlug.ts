import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindAiAgentBySlug, FindAiAgentBySlugRepository } from "@domain/index";

export class DbFindAiAgentBySlug implements FindAiAgentBySlug {

    constructor(
        private readonly findAiAgentBySlugRepository: FindAiAgentBySlugRepository
    ){}

    async findBySlug(slug: FindAiAgentBySlug.Slug): Promise<FindAiAgentBySlug.Result> {
        const aiAgent = await this.findAiAgentBySlugRepository.findBySlug(slug);
        if(!aiAgent) throw new NotFoundError("Not found ai agent with received slug.");
        return aiAgent;
    }

}