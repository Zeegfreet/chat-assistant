import { RefreshSession } from "@domain/index";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class RefreshSessionController implements Controller {
    constructor(
        private readonly refreshSession: RefreshSession
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response<any>> {
        try {
            const { refreshToken } = req.body;
            const sessionData = await this.refreshSession.refresh(refreshToken);
            return onSuccess(sessionData);
        } catch (error) {
            return errorHandler(error);
        }
    }

}