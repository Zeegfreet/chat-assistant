import { SearchUser, SearchUserRepository } from "@domain/index";

export class DbSearchUser implements SearchUser {

    constructor(
        private readonly searchRepository: SearchUserRepository
    ){}

    async search(params: SearchUser.Params): Promise<SearchUser.Result> {
        if(params.limit && params.limit > 500) params.limit = 500;
        
        const response = await this.searchRepository.search(params);
        
        return response;
    }

}