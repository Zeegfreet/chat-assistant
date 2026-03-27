import { SignUp } from "@domain/useCases/auth/signUp";
import { ServerError } from "@presentation/errors";
import { errorHandler, onCreate } from "@presentation/httpResponse/httpResponse";
import { SignUpDtoMapper } from "@presentation/mappers/dtos/auth/signUpDtoMapper";
import { SignUpUserPresenterMapper } from "@presentation/mappers/presenters/auth/signUpUserPresenterMapper";
import { Controller } from "@presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@presentation/protocols/http";

export class SignUpController implements Controller {
    constructor(
        private readonly dtoMapper: SignUpDtoMapper,
        private readonly presenterMapper: SignUpUserPresenterMapper,
        private readonly signUp: SignUp
    ){}
    async handle(req: HttpRequest<SignUpController.Request>): Promise<HttpResponse> {
        const raw = req.body;
        try {
            const dto = this.dtoMapper.to_dto(raw);

            const createdUser = await this.signUp.add(dto);
            
            if(!createdUser) throw new ServerError();

            const presenter = this.presenterMapper.to_presenter(createdUser);

            return onCreate(presenter);
            
        } catch (error) {
            return errorHandler(error);
        }
    }
    
}

export namespace SignUpController {
    export type Request = {
        name: string,
        email: string,
        password: string
    }
}