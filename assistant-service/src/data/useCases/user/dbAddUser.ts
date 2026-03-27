import { HashTransform } from "@data/protocols/hashTransform";
import { EmailAlreadyExistsError } from "@domain/errors/EmailAreadyInUseError";
import { AddUser, AddUserRepository, ConfirmUserExistenceByEmailRepository } from "@src/domain/index";

export class DbAddUser implements AddUser {
    constructor(
        private readonly hasher: HashTransform,
        private readonly addUserRepository: AddUserRepository,
        private readonly confirmUserExistence: ConfirmUserExistenceByEmailRepository,
    ){}
    
    async add(payload: AddUser.Params): Promise<AddUser.Result> {
        const exists = await this.confirmUserExistence.verify(payload.email);
        if(exists) throw new EmailAlreadyExistsError();

        payload.password = await this.hasher.hash(payload.password);

        const user = await this.addUserRepository.add(payload);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            isBlocked: user.isBlocked,
            isVerified: user.isVerified,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}