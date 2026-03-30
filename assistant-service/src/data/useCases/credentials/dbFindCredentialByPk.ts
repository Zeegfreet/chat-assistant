import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindCredentialByPk, FindCredentialByPkRepository } from "@domain/index";

export class DbFindCredentialByPk implements FindCredentialByPk {

    constructor(
        private readonly findCredentialByPkRepository: FindCredentialByPkRepository
    ){}

    async findById(id: FindCredentialByPk.Id): Promise<FindCredentialByPk.Result> {
        const credential = await this.findCredentialByPkRepository.findById(id);
        if(!credential) throw new NotFoundError("Not found credential with received id.");
        return credential;
    }

}