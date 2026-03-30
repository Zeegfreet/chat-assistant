import { Express } from "express";
import { expressMiddlewareAdapter } from "@app/adapters/expressMiddlewareAdapter";
import { makeStateLessLoadTokenMiddlewareFactory } from "@app/factories/middlewares/makeStateLessLoadTokenMiddlewareFactory";
import { makeGrantAdminAccessMiddlewareFactory } from "@app/factories/middlewares/makeGarantAdminAccessMiddlewareFactory";
import auth from "./authRoutes";
import user from "./userRoutes";
import permission from "./permissionRoutes";
import role from "./roleRoutes";
import profile from "./profileRoutes";
import jwk from "./jwkRoutes";
import messaging from "./messagingRoutes";
import test from "./testRoutes";
import credentials from "./credentialsRoutes";
import prompts from "./promptsRoutes";

const setupRouter = (app: Express) => {
    app.use("/",
        jwk,
        test
    );
    app.use("/pub", 
        auth,
        
    );
    app.use("/messaging", 
        messaging
    );
    app.use("/v1",
        expressMiddlewareAdapter(makeStateLessLoadTokenMiddlewareFactory()),
        profile,
        credentials,
        prompts
    );
    app.use(
        "/admin",
        expressMiddlewareAdapter(makeStateLessLoadTokenMiddlewareFactory()),
        expressMiddlewareAdapter(makeGrantAdminAccessMiddlewareFactory()),
        user,
        role,
        permission,

    );
};

export default setupRouter;