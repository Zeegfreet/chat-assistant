import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface MemoryGetAiAgentBySlugRepository {
    findBySlug(slug: MemoryGetAiAgentBySlugRepository.Slug): Promise<MemoryGetAiAgentBySlugRepository.Result | null>
}

export namespace MemoryGetAiAgentBySlugRepository{
    export type Slug = string;
    export type Result = AiAgentsModel
}