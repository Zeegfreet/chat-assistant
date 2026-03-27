import { DbConnection } from "@db/db/config/dbConnection";
import { LoadAuthUserByPkRepository } from "@domain/index";
import { Permission } from "@src/entitys/permission.entity";
import { User } from "@src/entitys/user.entity";

export class TypeOrmLoadAuthUserByPkRepository implements LoadAuthUserByPkRepository{

    private get userRepository() {
        return DbConnection.getInstance().getCollection(User);
    }
    
    private get permissionRepository(){
        return DbConnection.getInstance().getCollection(Permission);
    }

    async loadByPk(id: LoadAuthUserByPkRepository.UserID): Promise<LoadAuthUserByPkRepository.AuthUser> {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect(
                "user.roles",
                "role",
                "role.isActive = :isActive",
                { isActive: true }
            )
            .where("user.id = :id", { id })
            .getOne();

        if(!user) return null;

        const permissions = await this.permissionRepository
            .createQueryBuilder("permission")
            .innerJoin("permission.roles", "role")
            .innerJoin("role.users", "user")
            .where("user.id = :id", { id: user.id })
            .getMany();
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            isBlocked: user.isBlocked,
            isVerified: user.isVerified,
            roles: user.roles.map(role => role.role),
            permissions: permissions.map(permission => ({
                resource: permission.resource,
                method: permission.method
            }))
        };
    }

}