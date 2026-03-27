import { Express, NextFunction, Request, Response } from "express";

export const expressHttpLogger = (app: Express) => {

    const handler = (err: any, req: Request, _res: Response, next: NextFunction) => {
        if(err.statusCode && err.statusCode === 500){
            req.log.error(err);
        }
        next(err);
    };

    app.use(handler);
    
};