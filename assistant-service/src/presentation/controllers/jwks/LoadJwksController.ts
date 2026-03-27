import { LoadJwks } from "@domain/useCases/jwk/loadJWKs";
import { errorHandler } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class LoadJwksController implements Controller {
    constructor(
        private readonly loadJwks: LoadJwks
    ){}
    async handle(_req: Controller.Request): Promise<Controller.Response<any>> {
        try {
            const jwks = await this.loadJwks.load();
            return {
                statusCode: 200,
                body: jwks,
                simpleResponse: true
            };
        } catch (error) {
            return errorHandler(error);
        }
    }

}