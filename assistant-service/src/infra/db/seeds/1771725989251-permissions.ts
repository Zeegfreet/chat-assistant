import { Permission } from "@src/entitys/permission.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class Permissions1771725989251 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(Permission);
        const startPermissions: Pick<Permission, "resource" | "method">[] = [
            {
                resource: "PERMISSION",
                method: "CREATE",
            },
            {
                resource: "PERMISSION",
                method: "READ",
            },
            {
                resource: "PERMISSION",
                method: "UPDATE",
            },
            {
                resource: "PERMISSION",
                method: "DELETE",
            },
            {
                resource: "ROLE",
                method: "CREATE",
            },
            {
                resource: "ROLE",
                method: "READ",
            },
            {
                resource: "ROLE",
                method: "UPDATE",
            },
            {
                resource: "ROLE",
                method: "DELETE",
            },
            {
                resource: "USER",
                method: "CREATE",
            },
            {
                resource: "USER",
                method: "READ",
            },
            {
                resource: "USER",
                method: "UPDATE",
            },
            {
                resource: "USER",
                method: "DELETE",
            },
        ];
        await repository.upsert(startPermissions, ["resource", "method"]);
    }
}
