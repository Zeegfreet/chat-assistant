import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmUpdateUserRepository } from "@db/db/repositories/user/typeOrmUpdateUserRepository";
import { NotFoundError } from "@domain/errors/NotFoundError";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
});

beforeEach(async () => {
    const userRepository = DbConnection
        .getInstance()
        .getCollection("User");
    
    await userRepository.clear();

    const testUser = await userRepository.create({
        id: 1,
        name: "Mock User",
        email: "mockmail@mock.mc",
        password: "mockPassword",
    });

    await userRepository.save(testUser);
});

afterAll(async () => {
    await DbConnection
        .getInstance()
        .disconnect();
});

/* --------- SUT --------- */

const makeSut = () => {
    const sut = new TypeOrmUpdateUserRepository();
    return {
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa Repository TypeOrmUpdateUserRepository", () => {
    describe("Casos de sucesso", () => {
        test("Deve atualizar com sucesso", async () => {
            const testUserId = 1;
            const testUserDataToUpdate = {
                name: "Updated Mock User"
            };

            const { sut } = makeSut();

            const res = sut.update(testUserId, testUserDataToUpdate);

            await expect(res).resolves.toBeInstanceOf(Object);
            await expect(res).resolves.toMatchObject({
                id: testUserId,
                name: "Updated Mock User",
            });
        });

        test("Deve preservar campos não informados no update", async () => {
            const { sut } = makeSut();

            const res: any = await sut.update(1, { name: "Only Name Updated" });

            expect(res.name).toBe("Only Name Updated");
            expect(res.email).toBe("mockmail@mock.mc"); // valor original
        });

        test("Não deve atualizar usuário soft deleted", async () => {
            const repository = DbConnection.getInstance().getCollection("User");

            await repository.softDelete({ id: 1 });

            const { sut } = makeSut();

            await expect(
                sut.update(1, { name: "Fail Update" })
            ).rejects.toBeInstanceOf(NotFoundError);
        });

        test("Deve retornar instância de NotFoundError ao tentar atualizar usuário inexistente", async () => {
            const { sut } = makeSut();

            await expect(
                sut.update(999, { name: "X" })
            ).rejects.toBeInstanceOf(NotFoundError);
        });

        test("Deve atualizar os dados corretos", async () => {
            const testUserId = 1;
            const testUserDataToUpdate = {
                name: "Updated Mock User",
                email: "mockUpdatedMail@mock.mc"
            };

            const { sut } = makeSut();

            const res: any = await sut.update(testUserId, testUserDataToUpdate);

            expect(res).toMatchObject(testUserDataToUpdate);
            expect(res.id).toBe(testUserId);
        });

        test("Deve retornar o modelo de usuário atualizado", async () => {
            const testUserId = 1;
            const testUserDataToUpdate = {
                name: "Updated Mock User",
                email: "mockUpdatedMail@mock.mc"
            };

            const { sut } = makeSut();

            const res = await sut.update(testUserId, testUserDataToUpdate);

            expect(res).toEqual({
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                isActive: expect.any(Boolean),
                isAdmin: expect.any(Boolean),
                isBlocked: expect.any(Boolean),
                isVerified: expect.any(Boolean),
                roles: expect.any(Array),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });

        });
        
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["name", { email: "mockupdatedmail@mock.mc", name: null }],
            ["email", { email: null }],
            ["password", { email: "mockupdatedmail@mock.mc", password: null }],
        ])("Deve resultar em erro pois %s é null e o campo é obrigatório", async (_, testObj) => {
            const testUserId = 1;

            const { sut } = makeSut();

            await expect(sut.update(testUserId, testObj)).rejects.toBeInstanceOf(Error);
        });
    });
});