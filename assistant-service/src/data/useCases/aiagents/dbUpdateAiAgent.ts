import { UpdateAiAgentRepository, UpdateAiAgent } from "@domain/index";

export class DbUpdateAiAgent implements UpdateAiAgent {
    constructor(
        private readonly updateAiAgentRepository: UpdateAiAgentRepository
    ){}
    async update(id: UpdateAiAgent.Id, payload: UpdateAiAgent.Payload): Promise<UpdateAiAgent.Result> {

        const dto = {
            ...payload,
        };

        if(dto.slug){
            dto.slug = this.normalizeSlug(payload.slug);
        }
      
        const updatedData = await this.updateAiAgentRepository.update(id, dto);
        return updatedData;
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