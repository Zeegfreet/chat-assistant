import { Middleware } from "@presentation/protocols/middleware";
import { Response, Request, NextFunction } from "express";

export const expressMiddlewareAdapter = (middleware: Middleware) =>
    async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const httpRequest: Middleware.Request = {
                body: req.body,
                headers: req.headers,
                query: req.query,
                params: req.params,
                cookies: req.cookies,
                context: req.context
            };

            const result = await middleware.handle(httpRequest);

            if(result.next === false){
                return next(result.error);

            }
            
            req.context = req.context ?? {};
            Object.assign(req.context, result.context);

            return next();

        } catch (error) {
            return next(error);
        }
    };