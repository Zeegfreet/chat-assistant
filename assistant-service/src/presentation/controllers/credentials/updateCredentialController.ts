import { UpdateCredential } from "@domain/index";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class UpdateCredentialController implements Controller{

    constructor(
        private readonly updateCredential: UpdateCredential,
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;
            const rawPk = req.params;

            const payload = this.to_dto(raw);
            const pk = this.to_pk(rawPk);

            const updatedCredential = await this.updateCredential.update(pk, payload);

            return onSuccess(updatedCredential);
            
        } catch (error) {
            return errorHandler(error);
        }
    }

    to_dto(raw: any): UpdateCredential.Payload{
        const dto = {} as UpdateCredential.Payload;

        for(const [key, value] of Object.entries(raw)){
            if(["name", "accessToken", "refreshToken", "code", "accountId"].includes(key)){
                dto[key as keyof UpdateCredential.Payload] = String(value).trim();
            }
        }

        return dto;
    }

    to_pk(raw: any): UpdateCredential.Id{
        return Number(raw.id);
    }

}