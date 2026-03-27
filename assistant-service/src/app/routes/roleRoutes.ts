import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { expressValidationAdapter } from "@app/adapters/expressValidationAdapter";
import { makeAddRoleControllerFactory } from "@app/factories/controllers/role/makeAddRoleControllerFactory";
import { makeDeleteRoleControllerFactory } from "@app/factories/controllers/role/makeDeleteRoleControllerFactory";
import { makeFindRoleByPkControllerFactory } from "@app/factories/controllers/role/makeFindRoleByPkControllerFactory";
import { makeSearchRoleControllerFacotry } from "@app/factories/controllers/role/makeSearchRoleControllerFactory";
import { makeUpdateRoleControllerFacotory } from "@app/factories/controllers/role/makeUpdateRoleControllerFactory";
import { searchParamsValidationCompositeFactory } from "@app/factories/validations/makeSearchParamsvalidationCompositeFactory";
import { makeAddRoleValidationCompositeFactory } from "@app/factories/validations/role/makeAddRoleValidationCompositeFactory";
import { makeUpdateRoleValidationCompositeFacotry } from "@app/factories/validations/role/makeUpdateRoleValidationCompositeFactory";
import { singleIdValidationCompositeFactory } from "@app/factories/validations/singleIdValidationCompositeFactory";
import { Router } from "express";

const router = Router();

router
    .post("/role",
        expressValidationAdapter(makeAddRoleValidationCompositeFactory()),
        expressRouterAdapter(makeAddRoleControllerFactory())
    )
    .delete("/role/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeDeleteRoleControllerFactory())
    )
    .get("/role/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeFindRoleByPkControllerFactory())
    )
    .get("/role",
        expressValidationAdapter(searchParamsValidationCompositeFactory()),
        expressRouterAdapter(makeSearchRoleControllerFacotry())
    )
    .patch("/role/:id",
        expressValidationAdapter(makeUpdateRoleValidationCompositeFacotry()),
        expressRouterAdapter(makeUpdateRoleControllerFacotory())
    );

export default router;