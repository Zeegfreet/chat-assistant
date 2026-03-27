
import { readFileSync } from "node:fs";
import { JwtAssimetricEncrypterAdapter } from "@db/cryptography/jwtAssimetricEncrypterAdapter";
import { JwtAssimetricDecrypterAdapter } from "@db/cryptography/jwtAssimetricDecrypterAdapter";

/* ---------- SUT ---------- */

const makeSut = () => {
    const privateKey = readFileSync(process.env.JWT_PRIVATE_KEY_PATH!, { encoding: "utf-8" });
    const publicKey = readFileSync(process.env.JWT_PUBLIC_KEY_PATH!, { encoding: "utf-8" });
    const passphrase = process.env.JWT_PRIVATE_KEY_PASSPHRASE;
    const issuer = process.env.JWT_ISSUER;
    const kid = process.env.JWT_KID;
    const encrypter = new JwtAssimetricEncrypterAdapter(
        privateKey,
        passphrase,
        issuer,
        kid
    );
    const decrypter = new JwtAssimetricDecrypterAdapter(publicKey);
    return {
        encrypter,
        decrypter
    };
};

/* ---------- TESTS ---------- */

describe("Testa JwtAdapter", () => {
    const mockPayload = {
        id: 1,
        name: "Test User JWT"
    };

    describe("Casos de sucesso", () => {
        test("Deve criar um token JWT válido", async () => {
            const { encrypter } = makeSut();

            const token = await encrypter.encrypt(mockPayload);

            expect(typeof token).toBe("string");
            expect(token.split(".")).toHaveLength(3); // header.payload.signature
        });

        test("Deve descriptografar o token com sucesso", async () => {
            const { encrypter, decrypter } = makeSut();

            const token = await encrypter.encrypt(mockPayload);
            const payload = await decrypter.decrypt(token);

            console.log(payload);

            expect(payload).toBeInstanceOf(Object);
        });

        test("Deve retornar o payload original", async () => {
            const { encrypter, decrypter } = makeSut();

            const token = await encrypter.encrypt(mockPayload);
            const decrypt: any = await decrypter.decrypt(token);

            expect(decrypt.success).toBe(true);
            expect(decrypt.resources).toMatchObject(mockPayload);
        });
    });
});
