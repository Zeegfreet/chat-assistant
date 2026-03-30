import { makeDbSearchCredentialsFactory } from "@app/factories/useCases/credentials/makeDbSearchCredentialsFactory";
import { SearchCredentialController } from "@presentation/controllers/credentials/searchCredentialsController";
import { SearchDtoMapperService } from "@presentation/mappers/dtos/searchDtoMapperService";

export const makeSearchCredentialsControllerFactory = () => {
    const searchCredentials = makeDbSearchCredentialsFactory();
    const searchDtoMapper = new SearchDtoMapperService();
    return new SearchCredentialController(
        searchCredentials,
        searchDtoMapper
    );
};