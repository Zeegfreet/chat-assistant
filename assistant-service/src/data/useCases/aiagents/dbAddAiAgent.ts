import { AddAiAgent, AddAiAgentRepository } from "@domain/index";

export class DbAddAiAgent implements AddAiAgent {
    constructor(
        private readonly addAiAgent: AddAiAgentRepository
    ){}
    async add(payload: AddAiAgent.Params): Promise<AddAiAgent.Result> {

        const createdAiAgent = await this.addAiAgent.add(payload);
        
        return createdAiAgent;
    }

}