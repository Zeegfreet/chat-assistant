import { SignOut } from "@domain/index";
import { ValidationError } from "@presentation/errors";
import { errorHandler, onSuccessNoBody } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class SignOutController implements Controller {
    constructor(
        private readonly signOut: SignOut
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const sessionId = req.context?.user?.sessionId;
            if(!sessionId) throw new ValidationError("No session found to signOut");
            await this.signOut.logout(sessionId);
            return onSuccessNoBody();
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}