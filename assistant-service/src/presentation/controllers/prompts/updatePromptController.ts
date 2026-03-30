import { UpdatePrompt } from "@domain/index";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class UpdatePromptController implements Controller {

    constructor(
        private readonly updateCredential: UpdatePrompt,
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;
            const rawPk = req.params;

            const payload = this.to_dto(raw);
            const pk = this.to_pk(rawPk);

            const updatedPrompt = await this.updateCredential.update(pk, payload);

            return onSuccess(updatedPrompt);
            
        } catch (error) {
            return errorHandler(error);
        }
    }

    to_dto(raw: any): UpdatePrompt.Payload{
        const dto = {} as UpdatePrompt.Payload;

        for(const [key, value] of Object.entries(raw)){
            if(["name", "prompt"].includes(key) && value){
                dto[key as keyof UpdatePrompt.Payload] = String(value).trim();
            }
        }

        return dto;
    }

    to_pk(raw: any): UpdatePrompt.Id{
        return Number(raw.id);
    }

}