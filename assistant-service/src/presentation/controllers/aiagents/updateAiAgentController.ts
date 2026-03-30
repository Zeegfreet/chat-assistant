import { UpdateAiAgent } from "@domain/index";
import { errorHandler, onSuccess } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class UpdateAiAgentController implements Controller {

    constructor(
        private readonly updateAiAgent: UpdateAiAgent,
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;
            const rawPk = req.params;

            const payload = this.to_dto(raw);
            const pk = this.to_pk(rawPk);

            const updatedAiAgent = await this.updateAiAgent.update(pk, payload);

            return onSuccess(updatedAiAgent);
            
        } catch (error) {
            return errorHandler(error);
        }
    }

    to_dto(raw: any): UpdateAiAgent.Payload{
        const dto = {} as UpdateAiAgent.Payload;

        for(const [key, value] of Object.entries(raw)){
            if(["name", "slug", "model", "provider"].includes(key) && value){
                (dto[key as keyof UpdateAiAgent.Payload] as string )= String(value).trim();
            }
        }

        if(raw.isActive){
            dto.isActive = raw.isActive;
        }

        return dto;
    }

    to_pk(raw: any): UpdateAiAgent.Id{
        return Number(raw.id);
    }

}