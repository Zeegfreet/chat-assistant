import { FindProfileByPk } from "@domain/index";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class FindProfileController implements Controller {
    constructor(
        private readonly findProfileByPk: FindProfileByPk
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response<any>> {
        try {
            const { id } = req.context.user;
            const profile = await this.findProfileByPk.find(id);
            return onSuccess(profile);
        } catch (error) {
            return errorHandler(error);
        }
    }
}