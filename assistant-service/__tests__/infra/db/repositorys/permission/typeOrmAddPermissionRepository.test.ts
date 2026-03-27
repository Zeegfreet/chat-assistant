import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmAddPermissionRepository } from "@db/db/repositories/index";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { AddPermissionRepository } from "@domain/index";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
});

beforeEach(async () => {
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection("Permission");
    
    await permissionRepository.clear();
    const testPermissions: AddPermissionRepository.Result[] = [
        {
            id: 1,
            resource: "USERS",
            method: "CREATE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            resource: "USERS",
            method: "READ",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            resource: "USERS",
            method: "UPDATE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 4,
            resource: "USERS",
            method: "DELETE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ];
    await permissionRepository.insert(testPermissions);
        
});

afterAll(async () => {
    await DbConnection
        .getInstance()
        .disconnect();
});

/* --------- SUT --------- */

const makeSut = () => {
    const sut = new TypeOrmAddPermissionRepository();
    return {
        sut
    };
};
/* --------- TESTS --------- */

describe("Testa Repository TypeOrmAddPermissionRepository", () => {
    describe("Casos de sucesso", () => {
        const mockPayload: AddPermissionRepository.Params = {
            resource: "ROLES",
            method: "CREATE"
        };
        test("Deve adicioanr nova permission", async () => {
            const { sut } = makeSut();
            await expect(sut.add(mockPayload)).resolves.not.toBeNull();
        });
        test("Deve retornar os dados cadastrados", async () => {
            const { sut } = makeSut();
            const result = await sut.add(mockPayload);
            expect(result).toMatchObject(mockPayload);
        });
        test("Deve retornar o modelo de dados correto", async () => {
            const { sut } = makeSut();
            const result = await sut.add(mockPayload);
            expect(result).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    resource: expect.any(String),
                    method: expect.any(String),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                })
            );
        });
        test("Deve persistir Permission no banco de dados", async () => {
            const { sut } = makeSut();
            const permissionRepository = DbConnection.getInstance().getCollection("Permission");

            const created = await sut.add(mockPayload);
            const finded = await permissionRepository.findOneBy({ id: created.id });

            expect(created).toEqual(finded);
            
        });

        describe("Casos de erro / Restrições", () => {
            test("Deve lançar erro ao tentar adicionar duplicidade (AlreadyExistsError)", async () => {
                const { sut } = makeSut();
                const payload = { resource: "USERS", method: "CREATE" };
                const res = sut.add(payload);
                await expect(res).rejects.toBeInstanceOf(AlreadyExistsError);
            
            });
        });
    });
 
});