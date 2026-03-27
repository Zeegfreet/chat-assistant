import { Permission } from "@src/entitys/permission.entity";
import { Role } from "@src/entitys/role.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class Roles1771770895084 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const permissionRepo = dataSource.getRepository(Permission);
        const roleRepo = dataSource.getRepository(Role);

        const adminRole = await roleRepo.findOneBy({ role: "Administrador" });
        const permissions = await permissionRepo.find({});
        
        if(!adminRole){
    
            const role = roleRepo.create({
                role: "Administrador",
                description: "Usuário responsável pela gestão e administração do sistema",
                permissions: permissions
            });
    
            await roleRepo.save(role);
        } else {
            adminRole.permissions = permissions;

            await roleRepo.save(adminRole);
        }
    }
}
