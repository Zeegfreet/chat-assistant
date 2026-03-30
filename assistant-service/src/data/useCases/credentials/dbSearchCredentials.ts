import { SearchCredentials, SearchCredentialsRepository } from "@domain/index";

export class DbSearchCredentials implements SearchCredentials {

    constructor(
        private readonly searchCredentialsRepository: SearchCredentialsRepository
    ){}

    async list(params: SearchCredentials.Params): Promise<SearchCredentials.Result> {

        if(params.limit && params.limit > 500) params.limit = 500;
        
        const credentials = await this.searchCredentialsRepository.list(params);
        return credentials;
    }

}