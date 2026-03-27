import { NotFoundError } from "@presentation/errors";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class SessionVerifyController implements Controller {
    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const user = req.context?.user;
            if(!user) throw new NotFoundError("User not found related to received. token");
            return onSuccess({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                roles: user.roles,
                permissions: user.permissions
            });
        } catch (error) {
            return errorHandler(error);
        }
    }

}