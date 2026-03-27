import { NextFunction, Request, Response } from "express";
import { Controller } from "@src/presentation/protocols/controller";

export const expressRouterAdapter = (controller: Controller) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const httpRequest: Controller.Request = {
            headers: req.headers,
            body: req.body,
            params: req.params,
            cookies: req.cookies,
            query: req.query,
            context: req.context
        };

        try {
            
            const response = await controller.handle(httpRequest);

            const isProd = process.env.NODE_ENV === "production";
            if(response.statusCode >= 200 && response.statusCode <= 299){
                if(response.cookies) {
                    for(const cookie of response.cookies){
                        const {name, content, options} = cookie;
                        res.cookie(name, content, {
                            ...options,
                            sameSite: isProd ? "none" : "lax",
                            secure: isProd
                        });

                    }
                    
                }

                if(response.simpleResponse) return res.status(response.statusCode).json(response.body);

                return res.status(response.statusCode).json({
                    success: true,
                    resources: response.body
                });
            }
            next(response);
            
        } catch (error) {
            next(error);
        }

    };
};