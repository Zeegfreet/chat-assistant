import { ConflictError } from "@domain/errors/ConflictError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { FindUserByPkRepository, UpdateUser, UpdateUserRepository } from "@src/domain/index";

export class DbUpdateUser implements UpdateUser {
    constructor(
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly findUserBypkRepository: FindUserByPkRepository
    ){}
    async update(id: UpdateUser.ParamsId, payload: UpdateUser.Params, requesterId: UpdateUser.RequesterId): Promise<UpdateUser.Result> {

        const userToUpdate = await this.findUserBypkRepository.findByPk(id);

        if(!userToUpdate) throw new NotFoundError("User not found");

        if(userToUpdate.id === requesterId){
            if(payload.isActive !== undefined && payload.isActive === false) throw new ConflictError("An user cannot self inactive");
            if(payload.isBlocked !== undefined && payload.isBlocked === true) throw new ConflictError("An user cannot self block");
            if(payload.isAdmin !== undefined) throw new ConflictError("An user cannot self change admin status");
        }

        const updatedUser = await this.updateUserRepository.update(id, payload);
        
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
            updatedAt: updatedUser.updatedAt         
        };
    }

}