import { Request, Response, NextFunction } from "express";
import { Validation } from "@src/presentation/protocols/validation";
import { HttpRequest } from "@src/presentation/protocols/http";

export const expressValidationAdapter = (validation: Validation) => 
    async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const httpRequest: HttpRequest = {
                ...req,
                query: req.query
            };
            const error = await validation.validate(httpRequest);
            if(error) next(error);
            next();
        } catch (error) {
            next(error);
        }
    };