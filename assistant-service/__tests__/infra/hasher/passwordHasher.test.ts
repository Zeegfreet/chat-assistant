import { hashFactory } from "@app/factories/criptography/hashFactory";

describe("testa passwordHasher HASH", () => {
    const senhaMock = "senhaMock";
    test("Deve criar um hash da senha recebida", async () => {
        const hasher = hashFactory();
        const hash = await hasher.hash(senhaMock);
        const isMockedEqual = await hasher.compare(senhaMock, hash);
        expect(hash).not.toEqual(senhaMock);
        expect(isMockedEqual).toEqual(true);
    });

    test("Deve retornar um hash diferente para mesma senha", async () => {
        const hasher = hashFactory();
        const firstHash = await hasher.hash(senhaMock);
        const secondHash = await hasher.hash(senhaMock);
        expect(firstHash).not.toEqual(secondHash);
    });
    
});

describe("Testa passwordHasher COMPARE", () => {
    const senhaMock = "senhaMock";

    test("Deve retornar true se a senha for comparada com o hash da própria senha", async () => {
        const hasher = hashFactory();
        const hash = await hasher.hash(senhaMock);
        const compareMockToHash = await hasher.compare(senhaMock, hash);
        expect(compareMockToHash).toEqual(true);
    });
    test("Deve retornar false se a senha for comparada com a própria senha nominal", async () => {
        const hasher = hashFactory();
        const compareMockToMock = await hasher.compare(senhaMock, senhaMock);
        expect(compareMockToMock).toEqual(false);
    });
    test("Deve retorar false se o hash da senha for comparado com outro hash da própria senha", async () => {
        const hasher = hashFactory();
        const hash = await hasher.hash(senhaMock);
        const compareHashToHash = await hasher.compare(hash, hash);
        expect(compareHashToHash).toEqual(false);
    });
    test("Deve retornar false se a senha for comparada com o hash de outra senha diferente", async () => {
        const hasher = hashFactory();
        const hash = await hasher.hash(senhaMock);
        const compareMockToHash = await hasher.compare("outraSenha", hash);
        expect(compareMockToHash).toEqual(false);
    });
});