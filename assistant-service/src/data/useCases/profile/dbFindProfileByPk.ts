import { FindProfileByPk, FindUserByPkRepository } from "@domain/index";

export class DbFindProfileByPk implements FindProfileByPk{
    constructor(
        private readonly findUserByPkRepository: FindUserByPkRepository
    ){}
    async find(id: FindProfileByPk.UserId): Promise<FindProfileByPk.Result> {
        const user = await this.findUserByPkRepository.findByPk(id);

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

}