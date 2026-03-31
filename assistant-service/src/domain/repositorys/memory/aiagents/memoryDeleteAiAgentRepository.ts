
export interface MemoryDeleteAiAgentRepository {
    delete(slug: MemoryDeleteAiAgentRepository.Slug): Promise<void>
}

export namespace MemoryDeleteAiAgentRepository{
    export type Slug = string;
}