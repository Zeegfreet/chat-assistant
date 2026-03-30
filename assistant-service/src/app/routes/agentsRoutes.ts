import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { expressValidationAdapter } from "@app/adapters/expressValidationAdapter";
import { makeAddAiAgentControllerFactory, makeAddAiAgentValidationCompositeFactory, makeDeleteAiAgentControllerFactory, makeFindAiAgentByPkControllerFactory, makeSearchAiAgentControllerFactory, makeUpdateAiAgentControllerFactory, makeUpdateAiAgentValidationCompositeFactory, searchParamsValidationCompositeFactory, singleIdValidationCompositeFactory } from "@app/factories";
import { Router } from "express";

const router = Router();

router
    .post("/agents",
        expressValidationAdapter(makeAddAiAgentValidationCompositeFactory()),
        expressRouterAdapter(makeAddAiAgentControllerFactory())
    )
    .delete("/agents/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeDeleteAiAgentControllerFactory())
    )
    .get("/agents/agent/:slug",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeFindAiAgentByPkControllerFactory())   
    )
    .get("/agents/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeFindAiAgentByPkControllerFactory())   
    )
    .get("/agents",
        expressValidationAdapter(searchParamsValidationCompositeFactory()),
        expressRouterAdapter(makeSearchAiAgentControllerFactory())
    )
    .patch("/agents/:id",
        expressValidationAdapter(makeUpdateAiAgentValidationCompositeFactory()),
        expressRouterAdapter(makeUpdateAiAgentControllerFactory())
    );

export default router;