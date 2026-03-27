import { hashFactory } from "@app/factories/criptography/hashFactory";
import { Role } from "@src/entitys/role.entity";
import { User } from "@src/entitys/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class Users1771771871059 implements Seeder {
    track = false;

    private hasher = hashFactory();

    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const roleRepo = dataSource.getRepository(Role);
        const userRepo = dataSource.getRepository(User);

        const adminExists = await userRepo.findOneBy({ isAdmin: true });

        if(!adminExists){
            const roleAdmin = await roleRepo.find({ where: { role: "Administrador" } });
            const admin = userRepo.create({
                name: "Default Admin",
                email: "admin@hermes.com.br",
                password: await this.hasher.hash("admin"),
                roles: roleAdmin,
                isAdmin: true,
                isActive: true,
                isBlocked: false,
                isDeleted: false,
                isVerified: true
            });

            await userRepo.save(admin);

        }
        
    }
}
