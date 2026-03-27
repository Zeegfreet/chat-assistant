
export interface FindPromptByNameRepository {
    findByName(name: FindPromptByNameRepository.Name): Promise<FindPromptByNameRepository.Result | null>
}

export namespace FindPromptByNameRepository {
    export type Name = string;
    export type Result = {
        prompt: string
    }
}