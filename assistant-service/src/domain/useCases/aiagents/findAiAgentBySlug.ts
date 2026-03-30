import { AiAgentsModel } from "@domain/models/AiAgentsModel";

export interface FindAiAgentBySlug {
    findBySlug(slug: FindAiAgentBySlug.Slug): Promise<FindAiAgentBySlug.Result>
}

export namespace FindAiAgentBySlug{
    export type Slug = string;
    export type Result = AiAgentsModel;
}