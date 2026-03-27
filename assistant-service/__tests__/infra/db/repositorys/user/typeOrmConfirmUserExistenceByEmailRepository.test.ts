import { DbConnection } from "@db/db/config/dbConnection";
import { dbConfig } from "@app/config/dbConfig";
import { TypeOrmConfirmUserExistenceByEmail } from "@db/db/repositories";

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
    const sut = new TypeOrmConfirmUserExistenceByEmail();
    return {
        sut
    };
};

/* ---------- TESTS ----------- */

describe("Testa TypeOrmConfirmuserExistenceByEmail", () => {
    test("Deve retornar true pois usuário foi encontrado", async () => {
        const { sut } = makeSut();

        const mockPayload = "mockmail@mock.mc";

        const req = sut.verify(mockPayload);
        await expect(req).resolves.toBe(true);
    });

    test("Deve retornar false pois usuário não foi encontrado", async () => {
        const { sut } = makeSut();

        const mockPayload = "mockmail2@mock.mc";

        const req = sut.verify(mockPayload);
        await expect(req).resolves.toBe(false);
    });

    test("Não deve considerar softDeleted na pesquisa", async () => {
        const { sut } = makeSut();
        const mockPayload = "mockmail@mock.mc";

        const repo = DbConnection.getInstance().getCollection("User");

        const userToSoftDelete = await repo.findOneBy({ email: mockPayload });
        await repo.softRemove(userToSoftDelete);

        const req = sut.verify(mockPayload);
        await expect(req).resolves.toBe(false);
    });
});