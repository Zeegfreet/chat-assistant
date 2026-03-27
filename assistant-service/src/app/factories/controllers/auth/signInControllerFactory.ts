import { makeAppLoggerFactory } from "@app/factories/helpers/makeAppLoggerFactory";
import { makeDbSigninFactory } from "@app/factories/useCases/auth/makeDbSigninFactory";
import { SignInController } from "@presentation/controllers/auth/signInController";
import { ErrorLoggerDecorator } from "@presentation/decorators";
import { HelperSignInDtoMapper } from "@presentation/mappers/dtos/auth/helperSignInDtoMapper";

export const SignInControllerFactory = () => {
    const helperSignInDtoMapper = new HelperSignInDtoMapper();
    const dbSignIn = makeDbSigninFactory();
    const controller = new SignInController(
        helperSignInDtoMapper,
        dbSignIn
    );

    const appLogger = makeAppLoggerFactory();

    const logDecorator = new ErrorLoggerDecorator(
        controller,
        appLogger
    );

    return logDecorator; 

};