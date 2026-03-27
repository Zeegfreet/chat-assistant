import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmDeleteUserRepository } from "@db/db/repositories/user/typeOrmDeleteUserRepository";
import { NotFoundError } from "@presentation/errors";

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

/* --------- SUT ---------- */

const makeSut = () =>{
    const sut = new TypeOrmDeleteUserRepository();
    return {
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa repository TypeOrmDeleteUserRepository método DELETE", () => {
    describe("Casos de sucesso", () => {
        const mockPayload = 1;
        test("Deve deletar o usuário com sucesso", async () =>{
            const { sut } = makeSut();
            
            const request = sut.delete(mockPayload);

            await expect(request).resolves.toBeUndefined();
        });
        test("Deve apenas preencher a coluna deletedAt no banco, não deletando de fato o cliente (softDelete)", async () =>{
            const { sut } = makeSut();
            
            const repository = DbConnection.getInstance().getCollection("User");
            await sut.delete(mockPayload);

            const find: any = await repository.findOne({ where: { id: mockPayload}, withDeleted: true });

            expect(find).not.toBeNull();
            expect(find.id).toBe(mockPayload);
            expect(find.deletedAt).not.toBeNull();

        });
    });
    describe("Casos de insucesso", () => {
        test("Deve retornar uma instância de NotFoundError se usuário não encontrado", async () =>{
            const { sut } = makeSut();
            
            const mockPayload = 99;

            const request = sut.delete(mockPayload);

            await expect(request).resolves.toBeInstanceOf(NotFoundError);
        });
        test("Não deve permitir deletar um usuário já deletado", async () =>{
            const { sut } = makeSut();
            
            const mockPayload = 1;

            await sut.delete(mockPayload);
            const request = sut.delete(mockPayload);

            await expect(request).resolves.toBeInstanceOf(NotFoundError);
        });

        test("Não deve afetar outro usuário ao deletar", async () =>{
            const repository = DbConnection.getInstance().getCollection("User");

            const user2 = await repository.create({
                id: 2,
                name: "Outro User",
                email: "outro@mock.mc",
                password: "123"
            });

            await repository.save(user2);

            const { sut } = makeSut();

            await sut.delete(1);

            const stillExists = await repository.findOne({ where: { id: 2 } });
            expect(stillExists).not.toBeNull();
        });

    });
});