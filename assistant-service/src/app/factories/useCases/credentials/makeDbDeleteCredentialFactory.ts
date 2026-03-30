import { DbDeleteCredential } from "@data/useCases";
import { TypeOrmDeleteCredentialRepository } from "@db/db/repositories";

export const makeDbDeleteCredentialFactory = () => {
    const deleteCredentialRepository = new TypeOrmDeleteCredentialRepository();
    return new DbDeleteCredential(
        deleteCredentialRepository
    );
};