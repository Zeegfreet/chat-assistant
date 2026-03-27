import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmAddSessionRepository } from "@db/db/repositories";
import { AddSessionRepository } from "@domain/index";
import { Session } from "@src/entitys/session.entity";
import { User } from "@src/entitys/user.entity";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
    const userRepository = DbConnection
        .getInstance()
        .getCollection(User);

    await userRepository.clear();

    const testUser = userRepository.create({
        id: 1,
        name: "Joh Doe",
        email: "john@doe.com.br",
        password: "@JhonDoe1",
        isActive: true,
        isAdmin: false,
        isBlocked: false,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    
    const testUser2 = userRepository.create({
        id: 2,
        name: "Jane Doe",
        email: "jane@doe.com.br",
        password: "@JaneDoe1",
        isActive: true,
        isAdmin: false,
        isBlocked: false,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    
    await userRepository.save(testUser);
    await userRepository.save(testUser2);
});

beforeEach(async () => {
    
    const sessionRepository = DbConnection
        .getInstance()
        .getCollection(Session);
        
    await sessionRepository.clear();
        
});

afterAll(async () => {
    await DbConnection
        .getInstance()
        .disconnect();
});

/* --------- SUT --------- */

const makeSut = () => {
    const sut = new TypeOrmAddSessionRepository();
    return {
        sut
    };
};
/* --------- TESTS --------- */

describe("Testa TypeOrmAddSessionRepository", () => {
    describe("Casos de sucesso", () => {
        test("Deve cadastrar nova session com sucesso", async () => {
            const { sut } = makeSut();
            const payload: AddSessionRepository.Params = {
                isActive: true,
                origin: "LOGIN",
                user: { id: 1 }
            };

            const res = sut.add(payload);

            await expect(res).resolves.toMatchObject(payload);
            
        });
        test("Deve persistir os dados no banco", async () => {
            const { sut } = makeSut();
            const payload: AddSessionRepository.Params = {
                isActive: true,
                origin: "LOGIN",
                user: { id: 1 }
            };

            const repo = DbConnection.getInstance().getCollection(Session);

            await sut.add(payload);

            const res = await repo.findOne({ 
                where: { user: { id: 1 }},
                relations: { user: true },
                select: {
                    user: {
                        id: true
                    }
                }
            });

            expect(res).toMatchObject(payload);
            
        });
    });
    describe("Casos de insucesso", () => {
        test("Deve rejeitar caso user não informado", async () => {
            const { sut } = makeSut();
            const payload = {
                isActive: true,
                origin: "LOGIN",
            };

            const res = sut.add(payload as any);

            await expect(res).rejects.not.toBeNull();
            
        });
    });
});