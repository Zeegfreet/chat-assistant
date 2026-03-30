import { SearchAiAgent, SearchAiAgentRepository } from "@domain/index";

export class DbSearchAiAgent implements SearchAiAgent {

    constructor(
        private readonly searchAiAgentRepository: SearchAiAgentRepository
    ){}

    async list(params: SearchAiAgent.Params): Promise<SearchAiAgent.Result> {

        if(params.limit && params.limit > 500) params.limit = 500;
        
        const aiAgents = await this.searchAiAgentRepository.list(params);
        return aiAgents;
    }

}