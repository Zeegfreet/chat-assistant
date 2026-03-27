import { Logger } from "@domain/index";
import { Controller } from "@presentation/protocols/controller";

export class ErrorLoggerDecorator implements Controller{
    constructor(
        private readonly controller: Controller,
        private readonly logger: Logger
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        const response = await this.controller.handle(req);

        if(response.statusCode >= 400){
            await this.logger.log({
                message: `Error in ${this.controller.constructor.name}: ${JSON.stringify(response.primitiveError)}`,
                type: "error"
            });
        }

        return response;
    }
}