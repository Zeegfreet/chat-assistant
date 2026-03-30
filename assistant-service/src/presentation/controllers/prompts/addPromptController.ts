import { AddPrompt } from "@domain/index";
import { errorHandler, onCreate } from "@presentation/httpResponse/httpResponse";
import { Controller } from "@presentation/protocols/controller";

export class AddPromptController implements Controller {

    constructor(
        private readonly addPrompt: AddPrompt
    ){}

    async handle(req: Controller.Request): Promise<Controller.Response> {
        try {
            const raw = req.body;

            const dto = this.to_dto(raw);
            
            const response = await this.addPrompt.add(dto);

            const presenter = this.toPresenter(response);

            return onCreate(presenter);
        
        } catch (error) {
            return errorHandler(error);
        }
    }

    to_dto(raw: any): AddPrompt.Params{
        const dto = {} as AddPrompt.Params;
    
        for(const [key, value] of Object.entries(raw)){
            if(["name", "prompt"].includes(key) && value){
                dto[key as keyof AddPrompt.Params] = String(value).trim();
            }
        }
    
        return dto;
    }

    private toPresenter(prompt: AddPrompt.Result){
        return {
            id: prompt.id,
            name: prompt.name,
            prompt: prompt.prompt,
            createdAt: prompt.createdAt,
            updatedAt: prompt.updatedAt,
        };
    }

}