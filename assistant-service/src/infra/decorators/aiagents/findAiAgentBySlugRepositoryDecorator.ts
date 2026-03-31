import { FindAiAgentBySlugRepository, MemoryAddAiAgentRepository, MemoryGetAiAgentBySlugRepository } from "@domain/index";

export class FindAiAgentBySlugRepositoryDecorator implements FindAiAgentBySlugRepository {
    constructor(
        private readonly memoryGetAiAgentBySlugRepository: MemoryGetAiAgentBySlugRepository,
        private readonly memoryAddAiAgentRepository: MemoryAddAiAgentRepository,
        private readonly findAiAgentBySlugRepository: FindAiAgentBySlugRepository,
    ){}
    async findBySlug(slug: FindAiAgentBySlugRepository.Slug): Promise<FindAiAgentBySlugRepository.Result | null> {
        const memoryAgent = await this.memoryGetAiAgentBySlugRepository.findBySlug(slug);

        if(memoryAgent) return memoryAgent;

        const dbAgent = await this.findAiAgentBySlugRepository.findBySlug(slug);

        if(!dbAgent) return null;

        await this.memoryAddAiAgentRepository.add(dbAgent);

        return dbAgent;
    }

}