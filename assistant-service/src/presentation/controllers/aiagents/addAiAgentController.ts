import { AddAiAgent } from "@domain/index";
import { errorHandler, onCreate } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class AddAiAgentController implements Controller {

    constructor(
        private readonly addAiAgent: AddAiAgent
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;

            const dto = this.to_dto(raw);
            
            const response = await this.addAiAgent.add(dto);

            const presenter = this.toPresenter(response);

            return onCreate(presenter);
        
        } catch (error) {
            return errorHandler(error);
        }
    }

    to_dto(raw: Record<string, any>): AddAiAgent.Params{
        const dto = {} as AddAiAgent.Params;
    
        for(const [key, value] of Object.entries(raw)){
            if(["name", "slug", "model", "provider"].includes(key) && value){
                (dto[key as keyof AddAiAgent.Params] as string) = String(value).trim();
            }
        }

        if(raw.isActive){
            dto.isActive = raw.isActive;
        }
    
        return dto;
    }

    private toPresenter(prompt: AddAiAgent.Result){
        return {
            id: prompt.id,
            name: prompt.name,
            prompt: prompt.prompt,
            createdAt: prompt.createdAt,
            updatedAt: prompt.updatedAt,
        };
    }

}