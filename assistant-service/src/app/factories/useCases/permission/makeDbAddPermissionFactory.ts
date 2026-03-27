import { DbAddPermission } from "@data/useCases/permission/dbAddPermission";
import { TypeOrmAddPermissionRepository } from "@db/db/repositories";

export const makeDbAddPermissionFactory = () => {
    const addPermissionRepository = new TypeOrmAddPermissionRepository();
    
    return new DbAddPermission(
        addPermissionRepository
    );
};