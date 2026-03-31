import { AddAiAgent, AddAiAgentRepository } from "@domain/index";

export class DbAddAiAgent implements AddAiAgent {
    constructor(
        private readonly addAiAgent: AddAiAgentRepository
    ){}
    async add(payload: AddAiAgent.Params): Promise<AddAiAgent.Result> {

        const dto = {
            ...payload,
            slug: this.normalizeSlug(payload.slug)
        };

        const createdAiAgent = await this.addAiAgent.add(dto);
        
        return createdAiAgent;
    }

    private normalizeSlug(slug: string): string{
        return slug
            .normalize("NFD") // Separa acentos das letras (á -> a + ´)
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/ç/g, "c") // Remove cedilha
            .replace(/Ç/g, "C") // Remove cedilha maiúscula
            .trim() // Remove espaços nas extremidades
            .toLowerCase() // Converte para minúsculas
            .replace(/\s+/g, "-") // Substitui espaços por -
            .replace(/[^\w-]+/g, ""); // Remove outros caracteres especiais
    }

}