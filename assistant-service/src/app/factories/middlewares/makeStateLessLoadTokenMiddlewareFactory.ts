import { StateLessLoadTokenMiddleware } from "@presentation/middlewares/stateLessLoadTokenMiddleware";
import { jwtDecrypterAdapterFactory } from "../criptography/jwtDecrypterAdapterFactory";
import { makeVerifySessionIsInBlackListFactory } from "../useCases/auth/makeVerifySessionIsInBlackListFactory";

export const makeStateLessLoadTokenMiddlewareFactory = () => {
    const decrypter = jwtDecrypterAdapterFactory();
    const verifySessionIsInBlackList = makeVerifySessionIsInBlackListFactory();
    return new StateLessLoadTokenMiddleware(
        decrypter,
        verifySessionIsInBlackList
    );
};