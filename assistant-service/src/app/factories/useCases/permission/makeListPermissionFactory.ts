import { DbListPermission } from "@data/useCases/permission/dbListPermission";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";
import { TypeOrmListPermissionRepository } from "@db/db/repositories/permission/typeOrmListPermissionRepository";

export const makeListPermissionFactory = () => {
    const searchHelper = new TypeOrmSearchHelper(
        ["resource", "method"],
        ["id", "resource", "method", "createdAt", "updatedAt"],
        ["id", "resource", "method", "createdAt", "updatedAt"]
    );
    const listPermissionRepository = new TypeOrmListPermissionRepository(searchHelper);
    return new DbListPermission(
        listPermissionRepository
    );
};