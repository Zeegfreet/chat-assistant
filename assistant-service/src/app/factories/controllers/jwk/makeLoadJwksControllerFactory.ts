import { DefaultLoadJwks } from "@data/useCases/jwk/defaultLoadJwks";
import { CryptoJwkGenerator } from "@db/cryptography/cryptoJwkGenerator";
import { LoadJwksController } from "@presentation/controllers/jwks/LoadJwksController";
import { readFileSync } from "node:fs";
import path from "node:path";

export const makeLoadJwksControllerFactory = () => {
    const kid = process.env.JWT_KID!;
    const publicKeyPath = path.resolve(
        process.cwd(),
            process.env.JWT_PUBLIC_KEY_PATH!
    );
        
    const publicKey = readFileSync(publicKeyPath,{ 
        encoding: "utf-8"
    });
    
    const jwkGenerator = new CryptoJwkGenerator(
        kid,
        publicKey
    );
    const defaultLoadJwks = new DefaultLoadJwks(jwkGenerator);
    return new LoadJwksController(
        defaultLoadJwks
    );
};