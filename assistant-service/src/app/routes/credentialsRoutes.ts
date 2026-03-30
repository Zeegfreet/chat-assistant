import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { expressValidationAdapter } from "@app/adapters/expressValidationAdapter";
import { singleIdValidationCompositeFactory } from "@app/factories";
import { makeAddCredentialControllerFactory } from "@app/factories/controllers/credentials/makeAddCredentialControllerFactory";
import { makeDeleteCredentialControllerFactory } from "@app/factories/controllers/credentials/makeDeleteCredentialControllerFactory";
import { makeFindCredentialByPkControllerFactory } from "@app/factories/controllers/credentials/makeFindCredentialByPkControllerFactory";
import { makeSearchCredentialsControllerFactory } from "@app/factories/controllers/credentials/makeSearchCredentialsControllerFactory";
import { makeUpdateCredentialControllerFactory } from "@app/factories/controllers/credentials/makeUpdateCredentialControllerFactory";
import { makeAddCredentialValidationCompositeFactory } from "@app/factories/validations/credentials/makeAddCredentialValidationCompositeFactory";
import { makeUpdateCredentialValidationCompositeFactory } from "@app/factories/validations/credentials/makeUpdateCredentialValidationCompositeFactory";
import { searchParamsValidationCompositeFactory } from "@app/factories/validations/makeSearchParamsvalidationCompositeFactory";
import { Router } from "express";

const router = Router();

router
    .post("/credentials",
        expressValidationAdapter(makeAddCredentialValidationCompositeFactory()),
        expressRouterAdapter(makeAddCredentialControllerFactory())
    )
    .delete("/credentials/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeDeleteCredentialControllerFactory())
    )
    .get("/credentials/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeFindCredentialByPkControllerFactory())   
    )
    .get("/credentials",
        expressValidationAdapter(searchParamsValidationCompositeFactory()),
        expressRouterAdapter(makeSearchCredentialsControllerFactory())
    )
    .patch("/credentials/:id",
        expressValidationAdapter(makeUpdateCredentialValidationCompositeFactory()),
        expressRouterAdapter(makeUpdateCredentialControllerFactory())
    );

export default router;