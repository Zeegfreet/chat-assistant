import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { makeReceiveChatwootMessageControllerFactory } from "@app/factories/controllers/messaging/makeReceiveChatwootMessageControllerFactory";
import { Router } from "express";

const router = Router();

router
    .post("/chatwoot/:slug",
        expressRouterAdapter(makeReceiveChatwootMessageControllerFactory())
    );

export default router;