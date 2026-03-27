import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { makeFindProfileControllerFactory } from "@app/factories/controllers/profile/makeFindProfileControllerFactory";
import { Router } from "express";

const router = Router();

router
    .get("/profile",
        expressRouterAdapter(makeFindProfileControllerFactory())
    );

export default router;