import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AddRoleRepository } from "@domain/index";
import { Role } from "@src/entitys/role.entity";

export class TypeOrmAddRoleRepository implements AddRoleRepository{

    private dbErrorMapper = DbErrorMapper;

    private get repository() {
        return DbConnection.getInstance().getCollection(Role);
    }

    async add(payload: AddRoleRepository.Params): Promise<AddRoleRepository.Result> {
        try {
            
            const roleInstance = this.repository.create(payload);

            const savedRole =  await this.repository.save(roleInstance);

            const role = await this.repository.findOne({ 
                where: { id: savedRole.id },
                relations: { permissions: true },
            });

            return {
                id: role.id,
                role: role.role,
                description: role.description,
                permissions: role.permissions,
                isActive: role.isActive,
                isDefault: role.isDefault,
                updatedAt: role.updatedAt,
                createdAt: role.createdAt
            };
        } catch (err) {
            const mappedError = this.dbErrorMapper.map(err);
            if(mappedError.kind === "conflict"){
                if(mappedError.type === "unique"){
                    throw new AlreadyExistsError("Already exists a role with received data.");
                }
                if(mappedError.type === "foreign_key"){
                    throw new NotFoundError("Permission not found with received id");
                }
            }
            throw err;
        }
    }
}