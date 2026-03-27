import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { EmailAlreadyExistsError } from "@domain/errors/EmailAreadyInUseError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { UpdateUserRepository } from "@domain/index";
import { User } from "@src/entitys/user.entity";

export class TypeOrmUpdateUserRepository implements UpdateUserRepository{
    private errorMapper = DbErrorMapper;
    private get repository(){
        return DbConnection.getInstance().getCollection(User);
    }
    async update(id: UpdateUserRepository.ParamId, userData: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result> {
        try {
            const user = await this.repository.findOneBy({ id });
                    
            if (!user) throw new NotFoundError("User not found");
                    
            const toUpdateUser = { ...user, ...userData };
                    
            const savedUser = await this.repository.save(toUpdateUser);

            const updatedUser = await this.repository.findOne({
                where: {id: savedUser.id},
                relations: {
                    roles: true
                }
            });

            return {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isActive: updatedUser.isActive,
                isAdmin: updatedUser.isAdmin,
                isBlocked: updatedUser.isBlocked,
                isVerified: updatedUser.isVerified,
                roles: updatedUser.roles,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
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