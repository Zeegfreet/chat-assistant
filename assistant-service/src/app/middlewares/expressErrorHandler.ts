import { Express, NextFunction, Request, Response } from "express";

export const expressErrorHandler = (app: Express) => {

    const handler = (err: any, req: Request, res: Response, _next: NextFunction) => {
        const statusCode = err.statusCode || 500;
        const error = err.errorCode || "UNKNOWN_ERROR";
        const message = err.message || "Internal Server Error";

        return res.status(statusCode).json({
            success: false,
            error: error,
            message: message
        });

    };

    app.use(handler);
    
};