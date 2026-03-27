import { makeDbAddPermissionFactory } from "@app/factories/useCases/permission/makeDbAddPermissionFactory";
import { AddPermissionController } from "@presentation/controllers/permission/addPermissionController";

export const makeAddPermissionControllerFactory = () => {
    const dbAddPermission = makeDbAddPermissionFactory();
    return new AddPermissionController(
        dbAddPermission
    );
};