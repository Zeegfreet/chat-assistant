import { expressMiddlewareAdapter } from "@app/adapters/expressMiddlewareAdapter";
import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { expressValidationAdapter } from "@app/adapters/expressValidationAdapter";
import { makeStateLessLoadTokenMiddlewareFactory } from "@app/factories";
import { makeRefreshSessoinControllerFactory } from "@app/factories/controllers/auth/makeRefreshSessionControllerFactory";
import { makeSignOutControllerFactory } from "@app/factories/controllers/auth/makeSignOutControllerFactory";
import { SignInControllerFactory } from "@app/factories/controllers/auth/signInControllerFactory";
import { signUpControllerFactory } from "@app/factories/controllers/auth/signUpControllerFactory";
import { makeRefreshSessionValidationCompositeFactory } from "@app/factories/validations/auth/makeRefreshSessionValidationCompositeFactory";
import { signInValidationCompositeFactory } from "@app/factories/validations/auth/signInValidationCompositeFactory";
import { signUpValidationCompositeFactory } from "@app/factories/validations/auth/signUpValidationCompositeFactory";
import { SessionVerifyController } from "@presentation/controllers/auth/sessionVerifyController";
import { Router } from "express";

const router = Router();

router
    .post("/signup",
        expressValidationAdapter(signUpValidationCompositeFactory()),
        expressRouterAdapter(signUpControllerFactory())
    )
    .post("/signin",
        expressValidationAdapter(signInValidationCompositeFactory()),
        expressRouterAdapter(SignInControllerFactory())
    )
    .post("/signout",
        expressMiddlewareAdapter(makeStateLessLoadTokenMiddlewareFactory()),
        expressRouterAdapter(makeSignOutControllerFactory())
    )
    .post("/refresh",
        expressValidationAdapter(makeRefreshSessionValidationCompositeFactory()),
        expressRouterAdapter(makeRefreshSessoinControllerFactory())
    )
    .post("/verify",
        expressMiddlewareAdapter(makeStateLessLoadTokenMiddlewareFactory()),
        expressRouterAdapter(new SessionVerifyController())
    );

export default router;