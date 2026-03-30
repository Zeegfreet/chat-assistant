import { makeDbDeleteCredentialFactory } from "@app/factories/useCases/credentials/makeDbDeleteCredentialFactory";
import { DeleteCredentialController } from "@presentation/controllers/credentials/deleteCredentialController";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeDeleteCredentialControllerFactory = () => {
    const deleteCredential = makeDbDeleteCredentialFactory();
    const signleIdDtoMapper = new SingleIdDtoMapperService();
    return new DeleteCredentialController(
        deleteCredential,
        signleIdDtoMapper
    );
};