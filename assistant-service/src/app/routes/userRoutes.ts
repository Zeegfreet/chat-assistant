import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { expressValidationAdapter } from "@app/adapters/expressValidationAdapter";
import { singleIdValidationCompositeFactory } from "@app/factories/validations/singleIdValidationCompositeFactory";
import { Router } from "express";
import { 
    makeAddUserValidationCompositeFactory,
    makeUpdateUserValidationCompositeFactory,
    makeAddUserControllerFactory,
    makeUpdateUserControllerFactory,
    makeDeleteUserControllerFactory,
    makeFindUserByPkControllerFactory,
    makeSearchUserControllerFactory
} from "@app/factories/index";
import { searchParamsValidationCompositeFactory } from "@app/factories/validations/makeSearchParamsvalidationCompositeFactory";

const router = Router();

router
    .post("/user",
        expressValidationAdapter(makeAddUserValidationCompositeFactory()),
        expressRouterAdapter(makeAddUserControllerFactory())
    )
    .get("/user/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeFindUserByPkControllerFactory())
    )
    .get("/user",
        expressValidationAdapter(searchParamsValidationCompositeFactory()),
        expressRouterAdapter(makeSearchUserControllerFactory())
    )
    .patch("/user/:id",
        expressValidationAdapter(makeUpdateUserValidationCompositeFactory()),
        expressRouterAdapter(makeUpdateUserControllerFactory())
    )
    .delete("/user/:id", 
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeDeleteUserControllerFactory()));

export default router;
