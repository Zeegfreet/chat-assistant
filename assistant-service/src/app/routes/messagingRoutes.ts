import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { makeQueueReceivedChatwootMessageControllerFactory } from "@app/factories/controllers/messaging/makeQueueReceivedChatwootMessageControllerFactory";
import { Router } from "express";

const router = Router();

router
    .post("/chatwoot/:slug",
        expressRouterAdapter(makeQueueReceivedChatwootMessageControllerFactory())
    );

export default router;