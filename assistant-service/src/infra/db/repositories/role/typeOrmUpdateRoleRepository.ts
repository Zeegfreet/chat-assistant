import { DbConnection } from "@db/db/config/dbConnection";
import { DbErrorMapper } from "@db/db/errors/dbErrorMaper";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { UpdateRoleRepository } from "@domain/index";
import { Role } from "@src/entitys/role.entity";

export class TypeOrmUpdateRoleRepository implements UpdateRoleRepository{
    private mapper = DbErrorMapper;
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Role);
    }
    async update(id: UpdateRoleRepository.Id, payload: UpdateRoleRepository.Payload): Promise<UpdateRoleRepository.Result> {
        try {
            
            const roleToUpdate = await this.repository.findOne({ where: { id }, relations: {
                permissions: true
            } });
            if(!roleToUpdate) throw new NotFoundError("Role not found with received id.");
            const toupdateRole = { ...roleToUpdate, ...payload };
            const updatedRole = await this.repository.save(toupdateRole);
            return updatedRole;
        } catch (error) {
            const mappedError = this.mapper.map(error);
            if(mappedError.kind === "conflict"){
                if(mappedError.type === "unique"){
                    throw new AlreadyExistsError("Already exists a role with received data.");
                }
                if(mappedError.type === "foreign_key"){
                    throw new NotFoundError("Permission not found with received id");
                }
            }
            throw error;
        }
    }

}