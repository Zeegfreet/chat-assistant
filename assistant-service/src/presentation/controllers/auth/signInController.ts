import { SignIn } from "@domain/useCases/auth/signIn";
import { errorHandler, signed } from "@presentation/httpResponse/httpResponse";
import { SignInDtoMapper } from "@presentation/mappers";
import { Controller } from "@presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@presentation/protocols/http";

export class SignInController implements Controller{
    constructor(
        private readonly dtoMapper: SignInDtoMapper,
        private readonly signIn: SignIn
    ){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const raw = req.body;

            const dto = this.dtoMapper.to_dto(raw);
            
            const credentials = await this.signIn.login(dto);
            
            return signed(credentials);
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}