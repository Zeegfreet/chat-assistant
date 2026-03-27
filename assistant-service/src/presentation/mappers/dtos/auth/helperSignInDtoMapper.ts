import { SignInDtoMapper } from "./signInDtoMapper";

export class HelperSignInDtoMapper implements SignInDtoMapper {
    to_dto(input: SignInDtoMapper.Params): SignInDtoMapper.Result {
        return {
            email: input.email,
            password: input.password
        };
    }
}