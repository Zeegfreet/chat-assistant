import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { expressValidationAdapter } from "@app/adapters/expressValidationAdapter";
import { makeAddPromptControllerFactory, makeAddPromptValidationCompositeFactory, makeDeletePromptControllerFactory, makeFindPromptByPkControllerFactory, makeSearchPromptsControllerFactory, makeUpdatePromptControllerFactory, makeUpdatePromptValidationCompositeFactory, searchParamsValidationCompositeFactory, singleIdValidationCompositeFactory } from "@app/factories";
import { Router } from "express";

const router = Router();

router
    .post("/prompts",
        expressValidationAdapter(makeAddPromptValidationCompositeFactory()),
        expressRouterAdapter(makeAddPromptControllerFactory())
    )
    .delete("/prompts/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeDeletePromptControllerFactory())
    )
    .get("/prompts/:id",
        expressValidationAdapter(singleIdValidationCompositeFactory()),
        expressRouterAdapter(makeFindPromptByPkControllerFactory())   
    )
    .get("/prompts",
        expressValidationAdapter(searchParamsValidationCompositeFactory()),
        expressRouterAdapter(makeSearchPromptsControllerFactory())
    )
    .patch("/prompts/:id",
        expressValidationAdapter(makeUpdatePromptValidationCompositeFactory()),
        expressRouterAdapter(makeUpdatePromptControllerFactory())
    );

export default router;