import { ListUsers, ListUsersRepository } from "@src/domain/index";

export class DbListUsers implements ListUsers {
    constructor(
        private readonly listUsersRepository: ListUsersRepository
    ){}
    async list(): Promise<ListUsers.Result[]> {
        return await this.listUsersRepository.list();
    }
    
}