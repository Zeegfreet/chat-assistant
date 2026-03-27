import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { EmailAlreadyExistsError } from "@domain/errors/EmailAreadyInUseError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AddUserRepository } from "@domain/index";
import { User } from "@src/entitys/user.entity";

export class TypeOrmAddUserRepository implements AddUserRepository{
    private errorMapper = DbErrorMapper;
    async add(userData: AddUserRepository.Params): Promise<AddUserRepository.Result> {
        try {
            const userRepository = DbConnection.getInstance().getCollection(User);
            
            const userToSave = userRepository.create(userData);
            const savedUser = await userRepository.save(userToSave);

            const user = await userRepository.findOne({
                where: {id: savedUser.id},
                relations: {
                    roles: true
                }
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                isActive: user.isActive,
                isAdmin: user.isAdmin,
                isBlocked: user.isBlocked,
                isVerified: user.isVerified,
                roles: user.roles,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            
        } catch (error) {
            const mapper = this.errorMapper.map(error);
            if(mapper.kind === "conflict"){
                if(mapper.type === "unique"){
                    throw new EmailAlreadyExistsError();

                }
                if(mapper.type === "foreign_key"){
                    throw new NotFoundError("A received role id is not found");
                }
            }
            if(error.message.includes("role.role")) throw new NotFoundError("A received role id is not found");
            
            throw error;
        }
    }

}