import { CryptoJwkGenerator } from "@db/cryptography/cryptoJwkGenerator";
import path from "path";
import { readFileSync } from "fs";

const getPublicKey = () => {
    const publicKeyPath = path.resolve(
        process.cwd(),
            process.env.JWT_PUBLIC_KEY_PATH!
    );
        
    const privateKey = readFileSync(publicKeyPath,{ 
        encoding: "utf-8"
    });

    return privateKey;
};

const makeSut = () => {
    const key = "joishd98182hd9812e1";
    const publicKey = getPublicKey();
    const sut = new CryptoJwkGenerator(key, publicKey);
    return {
        sut,
        publicKey
    };
};

describe("Testa joseJWKGenerator método GENERATE", () => {
    test("Deve converter chave pública em JWK", async () => {
        const { sut } = makeSut();

        const jwk = await sut.generate();

        expect(jwk).toEqual({
            kty: "RSA",
            n: expect.any(String),
            e: expect.any(String),
            use: "sig",
            alg: "RS256",
            kid: expect.any(String),
        });
        
    });
});