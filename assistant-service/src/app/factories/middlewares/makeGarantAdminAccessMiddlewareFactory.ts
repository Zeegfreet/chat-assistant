import { GrantAdminAccessMiddleware } from "@presentation/middlewares/grantAdminAccessMiddleware";

export const makeGrantAdminAccessMiddlewareFactory = () =>{
    return new GrantAdminAccessMiddleware();
};