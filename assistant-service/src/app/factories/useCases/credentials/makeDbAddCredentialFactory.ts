import { DbAddCredential } from "@data/useCases";
import { TypeOrmAddCredentialRepository } from "@db/db/repositories";

export const makeDbAddCredentialFactory = () => {
    const addCredentialRepository = new TypeOrmAddCredentialRepository();
    return new DbAddCredential(
        addCredentialRepository
    );
};