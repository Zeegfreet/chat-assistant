import { makeDbFindCredentialByPkFactory } from "@app/factories/useCases/credentials/makeDbFindCredentialByPkFactory";
import { FindCredentialByPkController } from "@presentation/controllers/credentials/findCredentialByPkController";
import { SingleIdDtoMapperService } from "@presentation/mappers";

export const makeFindCredentialByPkControllerFactory = () => {
    const singleIdDtoMapper = new SingleIdDtoMapperService();
    const  findCredentialByPk = makeDbFindCredentialByPkFactory();
    return new FindCredentialByPkController(
        singleIdDtoMapper,
        findCredentialByPk
    );
};