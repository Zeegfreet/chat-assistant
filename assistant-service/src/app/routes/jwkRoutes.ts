import { expressRouterAdapter } from "@app/adapters/expressRouterAdapter";
import { makeLoadJwksControllerFactory } from "@app/factories/controllers/jwk/makeLoadJwksControllerFactory";
import { Router } from "express";

const router = Router();

router
    .get("/.well-known/jwks.json",
        expressRouterAdapter(
            makeLoadJwksControllerFactory()
        )
    );

export default router;