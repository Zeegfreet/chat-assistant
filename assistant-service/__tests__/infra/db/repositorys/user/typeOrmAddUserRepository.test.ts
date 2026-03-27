import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmAddUserRepository } from "@db/db/repositories/user/typeOrmAddUserRepository";
import { dbConfig } from "@app/config/dbConfig";
import { AddUserRepository } from "@domain/index";
import { EmailAlreadyExistsError } from "@domain/errors/EmailAreadyInUseError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { User } from "@src/entitys/user.entity";
import { Role } from "@src/entitys/role.entity";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
});

beforeEach(async () => {
    const userRepository = DbConnection
        .getInstance()
        .getCollection(User);
    
    await userRepository.clear();
        
});

afterAll( async () => {
    await DbConnection
        .getInstance()
        .disconnect();
});

/* ---------- MOCKS ---------- */

const makeMockPayload = (dto: Partial<AddUserRepository.Params> = {}):  AddUserRepository.Params => ({
    name: "Mock User",
    email: "mockmail@mock.mc",
    password: "mockPassword",
    ...dto
});

/* --------- SUT --------- */

const makeSut = () => {
    const sut = new TypeOrmAddUserRepository();
    return {
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa repository TypeOrmAddUserRepository método ADD", () => {
    describe("Casos de sucesso", () => {
        test("Deve cadastrar usuário com os dados corretos", async () => {
            const { sut } = makeSut();

            const mockPayload = makeMockPayload();
            const expectedResponse = { name: mockPayload.name, email: mockPayload.email};

            const response = sut.add(mockPayload);

            await expect(response).resolves.toMatchObject(expectedResponse);

        });
        test("Deve retornar todos os atributos do usuário", async () => {
            const { sut } = makeSut();

            const mockPayload = makeMockPayload();

            const res = await sut.add(mockPayload);

            expect(res).toHaveProperty("id");
            expect(res).toHaveProperty("name");
            expect(res).toHaveProperty("email");
            expect(res).toHaveProperty("isAdmin");
            expect(res).toHaveProperty("isActive");
            expect(res).toHaveProperty("isBlocked");
            expect(res).toHaveProperty("isVerified");
            expect(res).not.toHaveProperty("password");
            expect(res).not.toHaveProperty("deletedAt");
            expect(res).not.toHaveProperty("isDeleted");
            expect(res).toHaveProperty("roles");
            expect(res).toHaveProperty("createdAt");
            expect(res).toHaveProperty("updatedAt");

        });
        test("Deve gerar resposta com todos os atributos do usuário", async () => {
            const { sut } = makeSut();

            const mockPayload = makeMockPayload();

            const response = await sut.add(mockPayload);

            expect(response).toHaveProperty("id");
            expect(response).toHaveProperty("name");
            expect(response).toHaveProperty("email");
            expect(response).toHaveProperty("isActive");
            expect(response).toHaveProperty("isBlocked");
            expect(response).toHaveProperty("isAdmin");
            expect(response).toHaveProperty("isVerified");
            expect(response).toHaveProperty("updatedAt");
            expect(response).toHaveProperty("createdAt");
                                                
        });
        test("Deve persistir usuário no banco", async () => {
            const { sut } = makeSut();

            const mockPayload = makeMockPayload();

            const repo = DbConnection.getInstance().getCollection("User");
            const created = await sut.add(mockPayload);

            const found = await repo.findOneBy({ id: created.id });

            expect(found).not.toBeNull();
            expect(found).toMatchObject(mockPayload);
        });
        test("Deve permitir concorrência com softDeleted", async () => {
            const { sut } = makeSut();

            const mockPayload = makeMockPayload();
            const mockExpectedResponse = { name: mockPayload.name, email: mockPayload.email };

            const mockSoftDeleted = { deletedAt: new Date(), isDeleted: true, ...mockPayload};
            const repo = DbConnection.getInstance().getCollection("User");
            const softDeletedToCreate = repo.create(mockSoftDeleted);
            await repo.save(softDeletedToCreate);

            const created = sut.add(mockPayload);

            await expect(created).resolves.toMatchObject(mockExpectedResponse);
        });
        test("Deve associar Roles ao usuário", async () => {
            const { sut } = makeSut();
            
            const mockPayload = makeMockPayload({
                roles: [{ id: 1 }, { id: 2 }]
            });

            const repo = DbConnection.getInstance().getCollection(Role);

            const role1 = repo.create({ id: 1, role: "Role 1", description: "Role 1 description" });
            const role2 = repo.create({ id: 2, role: "Role 2", description: "Role 2 description" });

            await repo.save([role1, role2]);

            const res = await sut.add(mockPayload);
            
            expect(res.roles).toHaveLength(2);
            expect(res.roles[0]).toHaveProperty("id", 1);
            expect(res.roles[1]).toHaveProperty("id", 2);
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["name", {
                email: "teste@teste.com.br",
                password: "senhaTeste123"
            }],
            ["email", {
                name: "Usuário Teste",
                password: "senhaTeste123"
            }],
            ["password", {
                name: "Usuário Teste",
                email: "teste@teste.com.br",
            }]
        ])("Deve rejeitar pois a propriedade %s está ausente", (_: string, contextoMock: any) => {
            const { sut } = makeSut();
            expect(sut.add(contextoMock)).rejects.toBeInstanceOf(Error);
        });
        test("Deve rejeitar com istancia do erro EmailAlreadyExistsError, email em uso", async () => {
            const { sut } = makeSut();
            const mockUser = makeMockPayload();

            await sut.add(mockUser);
            const res = sut.add(mockUser);
            
            await expect(res).rejects.toBeInstanceOf(EmailAlreadyExistsError);

        });
        test("Deve rejeitar com NotFoundError se for recebido id de role que não existe", async () => {
            const { sut } = makeSut();
            const mockUser = makeMockPayload({
                roles: [{ id: 99 }]
            });

            const res = sut.add(mockUser);
            
            await expect(res).rejects.toBeInstanceOf(NotFoundError);

        });
    });
});