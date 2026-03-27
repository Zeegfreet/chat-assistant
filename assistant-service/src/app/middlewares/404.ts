import { Express } from "express";

const setup404 = (app: Express) => {
    app.use((_req, res, _next) => {
        return res.status(404).send({
            success: false,
            message: "Ops! nothing here"
        });
    });
};

export default setup404;