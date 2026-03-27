import { dbSignUpFactory } from "@app/factories/useCases/auth/dbSignUpFactory";
import { SignUpController } from "@presentation/controllers/auth/signUpController";
import { HelperSignUpDtomapper } from "@presentation/mappers/dtos/auth/helperSignUpDtoMapper";
import { HelperSignUpUserPresenterMapper } from "@presentation/mappers/presenters/auth/helperSignUpUserPresenterMapper";

export const signUpControllerFactory = () => {
    const dtoMapper = new HelperSignUpDtomapper();
    const presenterMapper = new HelperSignUpUserPresenterMapper();
    const dbSignUp = dbSignUpFactory();
    return new SignUpController(
        dtoMapper,
        presenterMapper,
        dbSignUp
    );
};