import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface FindAiAgentBySlugRepository {
    findBySlug(slug: FindAiAgentBySlugRepository.Slug): Promise<FindAiAgentBySlugRepository.Result | null>
}

export namespace FindAiAgentBySlugRepository{
    export type Slug = string
    export type Result = AiAgentsModel
}