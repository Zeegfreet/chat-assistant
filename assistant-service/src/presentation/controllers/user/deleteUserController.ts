import { DeleteUser } from "@domain/useCases/user/deleteUser";
import { onSuccessNoBody, errorHandler } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@presentation/protocols/http";

export class DeleteUserController implements Controller {
    constructor(
        private readonly dbDeleteUser: DeleteUser
    ){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const raw = req.params;
            const dto = this.toDto(raw);
            const requesterId = req.context.user?.id;

            await this.dbDeleteUser.delete(dto, requesterId);
            return onSuccessNoBody();
        } catch (error) {
            return errorHandler(error);
        }
    }

    private toDto(raw: any) {
        return {
            id: Number(raw.id)
        };
    }
}