import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmListUsersRepository } from "@db/db/repositories/user/typeOrmListUsersRepository";

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
    const sut = new TypeOrmListUsersRepository();
    return {
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa Repository TypeOrmListUsersRepository", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar o modelo de dados correto", async () => {
            const { sut } = makeSut();

            const res = sut.list();

            await expect(res).resolves.toBeInstanceOf(Array);
            await expect(res).resolves.toEqual([
                expect.objectContaining({
                    name: "Mock User",
                })
            ]);
        });
        test("Deve retornar todos os atributos do usuário", async () => {
            const { sut } = makeSut();

            const res = await sut.list();

            expect(res[0]).toHaveProperty("id");
            expect(res[0]).toHaveProperty("name");
            expect(res[0]).toHaveProperty("email");
            expect(res[0]).toHaveProperty("isAdmin");
            expect(res[0]).toHaveProperty("isActive");
            expect(res[0]).toHaveProperty("isBlocked");
            expect(res[0]).toHaveProperty("createdAt");
            expect(res[0]).toHaveProperty("updatedAt");
        });
        test("Deve retornar um array vazio se não houverem informações a listar", async () => {
            const userRepository = DbConnection
                .getInstance()
                .getCollection("User");
            
            await userRepository.clear();

            const { sut } = makeSut();

            const res = await sut.list();

            expect(res).toStrictEqual([]);

        });
        test("Não deve retornar usuários softDeleteds", async () => {
            const userRepository = DbConnection
                .getInstance()
                .getCollection("User");
            const userToDelete = await userRepository.findOneBy({ id: 1 });
            await userRepository.softRemove(userToDelete);

            const { sut } = makeSut();

            const res = await sut.list();

            expect(res).toStrictEqual([]);
        });

        test("Deve retornar múltiplos usuários", async () => {
            const userRepository = DbConnection
                .getInstance()
                .getCollection("User");
            
            await userRepository.save(
                userRepository.create({
                    id: 2,
                    name: "Outro User",
                    email: "outro@mock.mc",
                    password: "mockPassword",
                })
            );

            const { sut } = makeSut();

            const res = await sut.list();

            expect(res).toHaveLength(2);
        });
    });
});
