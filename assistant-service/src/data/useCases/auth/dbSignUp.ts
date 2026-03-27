import { HashTransform } from "@data/protocols/hashTransform";
import { EmailAlreadyExistsError } from "@domain/errors/EmailAreadyInUseError";
import { AddUserRepository, ConfirmUserExistenceByEmailRepository, FindDefaultRoleRepository } from "@domain/index";
import { SignUp } from "@domain/useCases/auth/signUp";

export class DbSignUp implements SignUp{
    constructor(
        private readonly confirmUserExistence: ConfirmUserExistenceByEmailRepository,
        private readonly addUserRepository: AddUserRepository,
        private readonly findDefaultRoles: FindDefaultRoleRepository,
        private readonly hashTransform: HashTransform,
    ){}
    async add(dto: SignUp.Params): Promise<SignUp.Result> {
        const exists = await this.confirmUserExistence.verify(dto.email);
        if (exists) throw new EmailAlreadyExistsError();
    
        dto.password = await this.hashTransform.hash(dto.password);

        const defaultRoles = await this.findDefaultRoles.find();
    
        const user = await this.addUserRepository.add({ ...dto, roles: defaultRoles });
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
            
    }
    
}