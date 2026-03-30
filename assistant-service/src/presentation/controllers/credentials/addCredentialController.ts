import { AddCredential } from "@domain/index";
import { errorHandler, onCreate } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class AddCredentialController implements Controller {

    constructor(
        private readonly addCredential: AddCredential
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const dto = req.body;
            
            const response = await this.addCredential.add(dto);

            const presenter = this.toPresenter(response);

            return onCreate(presenter);
        
        } catch (error) {
            return errorHandler(error);
        }
    }

    private toPresenter(credential: AddCredential.Result){
        return {
            id: credential.id,
            name: credential.name,
            accessToken: credential.accessToken,
            refreshToken: credential.refreshToken,
            code: credential.code,
            accountId: credential.accountId,
            createdAt: credential.createdAt,
            updatedAt: credential.updatedAt,
        };
    }

}