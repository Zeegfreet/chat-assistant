import { SignUpDtoMapper } from "./signUpDtoMapper";

export class HelperSignUpDtomapper implements SignUpDtoMapper{
    to_dto(input: SignUpDtoMapper.Input): SignUpDtoMapper.Result {
        return {
            name: input.name.trim(),
            email: input.email.toLowerCase().trim(),
            password: input.password.trim().replace(/\s+/g, "")
        };
    }
    
}