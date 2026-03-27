import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmFindUserByPkRepository } from "@db/db/repositories/user/typeOrmFindUserByPkRepository";

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
    const sut = new TypeOrmFindUserByPkRepository();
    return {
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa Repository TypeOrmFindUserByPkRepository", () => {
    describe("Casos de sucesso", () => {
        const payload = 1;
        test("Deve retornar o usuário encontrado com sucesso", async () => {
            const { sut } = makeSut();

            const response = await sut.findByPk(payload);

            expect(response).toMatchObject({ id: payload });
        });

        test("Deve retornar todos os atributos do usuário", async () => {
            const { sut } = makeSut();

            const res = await sut.findByPk(payload);

            expect(res).toHaveProperty("id");
            expect(res).toHaveProperty("name");
            expect(res).toHaveProperty("email");
            expect(res).not.toHaveProperty("password");
            expect(res).toHaveProperty("isAdmin");
            expect(res).toHaveProperty("isActive");
            expect(res).toHaveProperty("isBlocked");
            expect(res).toHaveProperty("isVerified");
            expect(res).not.toHaveProperty("isDeleted");
            expect(res).not.toHaveProperty("deletedAt");
            expect(res).toHaveProperty("createdAt");
            expect(res).toHaveProperty("updatedAt");
        });
       
    });
    describe("Casos de insucesso", () => {
        test("Deve retornar null caso usuário não encontrado", async () => {
            const payload = 99;

            const { sut } = makeSut();

            const response = await sut.findByPk(payload);

            expect(response).toBeNull();
            await expect(sut.findByPk(99)).resolves.toBeNull();
        });

        test("Não deve retornar usuário soft deleted", async () => {
            const repository = DbConnection.getInstance().getCollection("User");

            await repository.softDelete({ id: 1 });

            const { sut } = makeSut();

            const response = await sut.findByPk(1);

            expect(response).toBeNull();
        });

    });
});