import { SearchRole, SearchRoleRepository } from "@domain/index";

export class DbSearchRole implements SearchRole {

    constructor(
        private readonly searchRepository: SearchRoleRepository
    ){}

    async list(params: SearchRole.Params): Promise<SearchRole.Result> {
        if(params.limit && params.limit > 500) params.limit = 500;
        
        const response = await this.searchRepository.list(params);
        
        return response;
    }

}