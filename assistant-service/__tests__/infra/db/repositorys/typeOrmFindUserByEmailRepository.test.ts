import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmFindUserByEmailRepository } from "@db/db/repositories/user/typeOrmFindUserByEmailRepository";

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
    const sut = new TypeOrmFindUserByEmailRepository();
    return {
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa Repository TypeOrmFindUserByEmailRepository", () => {
    describe("Testa o método findByEmail", () => {
        describe("Casos de sucesso", () => {
            const payload = "mockmail@mock.mc";
            test("Deve retornar o usuário encontrado com sucesso", async () => {
                const { sut } = makeSut();
                const response = sut.findByEmail(payload);

                await expect(response).resolves.toMatchObject({ email: payload });
            });

            test("Deve retornar todos os atributos do usuário", async () => {
                const { sut } = makeSut();

                const res = await sut.findByEmail(payload);

                expect(res).toHaveProperty("id");
                expect(res).toHaveProperty("name");
                expect(res).toHaveProperty("email");
                expect(res).toHaveProperty("password");
                expect(res).toHaveProperty("isAdmin");
                expect(res).toHaveProperty("isActive");
                expect(res).toHaveProperty("isBlocked");
                expect(res).toHaveProperty("isVerified");
                expect(res).toHaveProperty("createdAt");
                expect(res).toHaveProperty("updatedAt");
                expect(res).not.toHaveProperty("roles");

            });

            test("Deve retornar usuário mesmo e-mail estando em caixa alta", async () => {
                const { sut } = makeSut();
                const response = sut.findByEmail(payload.toUpperCase());

                await expect(response).resolves.toMatchObject({ email: payload });
            });
        
        });
        describe("Casos de insucesso", () => {
            test("Deve retornar null se usuário não for encontrado", async () => {
                const payload = "notfound@mock.mc";
                const { sut } = makeSut();
                const response = sut.findByEmail(payload);

                await expect(response).resolves.toBeNull();
            });
            test("Deve retornar null se e-mail de softDeleted for informado", async () => {
                const payload = "notfound@mock.mc";
                const repository = DbConnection.getInstance().getCollection("User");

                await repository.softDelete({ id: 1 });
                const { sut } = makeSut();

                const response = sut.findByEmail(payload);

                await expect(response).resolves.toBeNull();
            });
        });
    });
    describe("Testa o método findByEmailWithRoles", () => {
        describe("Casos de sucesso", () => {
            const payload = "mockmail@mock.mc";
            test("Deve retornar o usuário encontrado com sucesso", async () => {
                const { sut } = makeSut();
                const response = sut.findByEmailWithRoles(payload);

                await expect(response).resolves.toMatchObject({ email: payload });
            });

            test("Deve retornar todos os atributos do usuário", async () => {
                const { sut } = makeSut();

                const res = await sut.findByEmailWithRoles(payload);

                expect(res).toHaveProperty("id");
                expect(res).toHaveProperty("name");
                expect(res).toHaveProperty("email");
                expect(res).toHaveProperty("password");
                expect(res).toHaveProperty("isAdmin");
                expect(res).toHaveProperty("isActive");
                expect(res).toHaveProperty("isBlocked");
                expect(res).toHaveProperty("isVerified");
                expect(res).toHaveProperty("createdAt");
                expect(res).toHaveProperty("updatedAt");
                expect(res).toHaveProperty("roles");
                expect(res.roles).toStrictEqual([]);

            });

            test("Deve retornar usuário mesmo e-mail estando em caixa alta", async () => {
                const { sut } = makeSut();
                const response = sut.findByEmailWithRoles(payload.toUpperCase());

                await expect(response).resolves.toMatchObject({ email: payload });
            });
        
        });
        describe("Casos de insucesso", () => {
            test("Deve retornar null se usuário não for encontrado", async () => {
                const payload = "notfound@mock.mc";
                const { sut } = makeSut();
                const response = sut.findByEmailWithRoles(payload);

                await expect(response).resolves.toBeNull();
            });
            test("Deve retornar null se e-mail de softDeleted for informado", async () => {
                const payload = "notfound@mock.mc";
                const repository = DbConnection.getInstance().getCollection("User");

                await repository.softDelete({ id: 1 });
                const { sut } = makeSut();

                const response = sut.findByEmailWithRoles(payload);

                await expect(response).resolves.toBeNull();
            });
        });
    });
});