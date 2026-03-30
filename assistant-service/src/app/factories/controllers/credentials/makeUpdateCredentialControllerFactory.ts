import { makeDbUpdateCredentialFactory } from "@app/factories/useCases/credentials/makeDbUpdateCredentialFactory";
import { UpdateCredentialController } from "@presentation/controllers/credentials/updateCredentialController";

export const makeUpdateCredentialControllerFactory = () => {
    const updateCredential = makeDbUpdateCredentialFactory();
    return new UpdateCredentialController(
        updateCredential
    );
};