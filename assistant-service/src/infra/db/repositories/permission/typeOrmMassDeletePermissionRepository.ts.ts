import { DbConnection } from "@db/db/config/dbConnection";
import { MassDeletePermissionRepository } from "@domain/repositorys/permission/massDeletePermissionRepository";
import { Permission } from "@src/entitys/permission.entity";

export class TypeOrmMassDeletePermissionRepository implements MassDeletePermissionRepository{
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(Permission);
    }
    async delete(ids: MassDeletePermissionRepository.Id[]): Promise<MassDeletePermissionRepository.Result> {

        if(ids.length === 0) return 0;

        const qb = await this.repository
            .createQueryBuilder()
            .delete()
            .from(Permission)
            .where("id IN (:...ids)", { ids })
            .execute();

        return qb.affected;
    }

}