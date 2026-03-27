import { JwtSimetricEncrypterAdapter } from "@db/cryptography/jwtSimetricEncrypterAdapter";
import { JwtSimetricDecrypterAdapter } from "@db/cryptography/jwtSimetricDecrypterAdapter";

/* ---------- SUT ---------- */

const makeSut = () => {
    const sut = new JwtSimetricEncrypterAdapter();
    const decrypter = new JwtSimetricDecrypterAdapter();

    return {
        sut,
        decrypter
    };
};

/* ---------- SUT ---------- */
describe("Testa jwtSimetricEncrypterAdapter" , () => {
    const payload = {
        id: 99,
        name: "Mock Payload"
    };
    test("Deve gerar um jwt com sucesso", async () => {
        const { sut } = makeSut();
        const encrypted = sut.encrypt(payload);
        await expect(encrypted).resolves.toEqual(expect.any(String));
    });
    test("Deve descriptografar com sucesso", async () => {
        const { sut, decrypter } = makeSut();
        const encrypted = await sut.encrypt(payload);
        const decrypted = decrypter.decrypt(encrypted);
        await expect(decrypted).resolves.toEqual(expect.any(Object));
    });
    test("Deve retornar os dados corretos", async () => {
        const { sut, decrypter } = makeSut();
        const encrypted = await sut.encrypt(payload);
        const decrypted = await decrypter.decrypt(encrypted);
        expect(decrypted.success).toBe(true);
        expect((decrypted as any).resources).toMatchObject(payload);
    });
});