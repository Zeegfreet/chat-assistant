import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { expressValidationAdapter } from "@app/adapters/expressValidationAdapter";
import { makeAddPermissionControllerFactory } from "@app/factories/controllers/permission/makeAddPermissionControllerFactory";
import { makeDeletePermissionControllerFactory } from "@app/factories/controllers/permission/makeDeletePermissionControllerFactory";
import { makeFindPermissionByPkControllerFactory } from "@app/factories/controllers/permission/makeFindPermissionByPkController";
import { makeListPermissionControllerFactory } from "@app/factories/controllers/permission/makeListPermissionControllerFactory";
import { makeMassDeletePermissionControllerFactory } from "@app/factories/controllers/permission/makeMassDeletePermissionControllerFactory";
import { makeUpdatePermissionControllerFactory } from "@app/factories/controllers/permission/makeUpdatePermissionControllerFactory";
import { makeMassIdsValidationCompositeFactory } from "@app/factories/validations/makeMassIdsValidationCompositeFactory";
import { searchParamsValidationCompositeFactory } from "@app/factories/validations/makeSearchParamsvalidationCompositeFactory";
import { makeAddPermissionValidationCompositeFactory } from "@app/factories/validations/permission/makeAddPermissionValidationCompositeFactory";
import { makeUpdatePermissionValidationCompositeFacotry } from "@app/factories/validations/permission/makeUpdatePermissionValidationCompositeFactory";
import { singleIdValidationCompositeFactory } from "@app/factories/validations/singleIdValidationCompositeFactory";
import { Router } from "express";

const router = Router();

router
    .post("/permission",
        expressValidationAdapter(makeAddPermissionValidationCompositeFactory()),
        expressRouterAdapter(makeAddPermissionControllerFactory())
    )
    .get("/permission/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeFindPermissionByPkControllerFactory())
    )
    .get("/permission", 
        expressValidationAdapter(searchParamsValidationCompositeFactory()),
        expressRouterAdapter(makeListPermissionControllerFactory())
    )
    .delete("/permission/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeDeletePermissionControllerFactory())
    )
    .delete("/permission",
        expressValidationAdapter(makeMassIdsValidationCompositeFactory()),
        expressRouterAdapter(makeMassDeletePermissionControllerFactory())
    )
    .patch("/permission/:id",
        expressValidationAdapter(makeUpdatePermissionValidationCompositeFacotry()),
        expressRouterAdapter(makeUpdatePermissionControllerFactory())
    );

export default router;