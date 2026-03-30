import { makeDbAddCredentialFactory } from "@app/factories/useCases/credentials/makeDbAddCredentialFactory";
import { AddCredentialController } from "@presentation/controllers/credentials/addCredentialController";

export const makeAddCredentialControllerFactory = () => {
    const addCredential = makeDbAddCredentialFactory();
    return new AddCredentialController(addCredential);
};