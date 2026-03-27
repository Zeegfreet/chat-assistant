import { JwtAssimetricEncrypterAdapter } from "@db/cryptography/jwtAssimetricEncrypterAdapter";
import { readFileSync } from "node:fs";
import path from "node:path";

export const jwtEncrypterAdapterFactory = () => {
    const privateKeyPath = path.resolve(
        process.cwd(),
        process.env.JWT_PRIVATE_KEY_PATH!
    );

    const privateKey = readFileSync(privateKeyPath,{ 
        encoding: "utf-8"
    });

    const issuer = process.env.JWT_ISSUER;
    const passphrase = process.env.JWT_PRIVATE_KEY_PASSPHRASE;
    const kid = process.env.JWT_KID;
    
    return new JwtAssimetricEncrypterAdapter(
        privateKey,
        passphrase,
        issuer,
        kid
    );
};