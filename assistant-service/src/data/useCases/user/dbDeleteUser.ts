import { ConflictError } from "@domain/errors/ConflictError";
import { ForbiddenError } from "@domain/errors/ForbbidenError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { CountActiveAdminUsersRepository, DeleteUserRepository, FindUserByPkRepository } from "@domain/index";
import { DeleteUser } from "@src/domain/useCases/user/deleteUser";

export class DbDeleteUser implements DeleteUser {
    constructor(
        private readonly deleteUserRepository: DeleteUserRepository,
        private readonly countAdminUserRepository: CountActiveAdminUsersRepository,
        private readonly findUserByPkRepository: FindUserByPkRepository
    ){}
    async delete(payload: DeleteUser.Params, requesterId: DeleteUser.RequesterId): Promise<DeleteUser.Result> {
        const { id } = payload;

        const isRequester = id === requesterId;
        if(isRequester) throw new ConflictError("A user cannot delete themselves.");
        
        const userToDelete = await this.findUserByPkRepository.findByPk(id);

        if(!userToDelete) throw new NotFoundError("User not found");

        if(userToDelete.isAdmin) {
            const countAdmins = await this.countAdminUserRepository.count();
            if(countAdmins <= 1) throw new ForbiddenError("Before deleting this administrator, you need to create another administrator user.");
        }

        const deleteError = await this.deleteUserRepository.delete(id);

        if(deleteError) throw deleteError;
        return;
    }
    
}