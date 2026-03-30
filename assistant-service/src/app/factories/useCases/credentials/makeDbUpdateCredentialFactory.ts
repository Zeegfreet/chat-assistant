import { DbUpdateCredential } from "@data/useCases";
import { TypeOrmUpdateCredentialRepository } from "@db/db/repositories";

export const makeDbUpdateCredentialFactory = () => {
    const udpateCredentialRepository = new TypeOrmUpdateCredentialRepository();
    return new DbUpdateCredential(
        udpateCredentialRepository
    );
};