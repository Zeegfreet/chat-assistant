import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmMassDeletePermissionRepository } from "@db/db/repositories";
import { Permission } from "@src/entitys/permission.entity";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
});

beforeEach(async () => {
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);
    
    await permissionRepository.clear();
    const testPermissions = [
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
            resource: "PERMISSION",
            method: "READ",
            createdAt: new Date(),
            updatedAt: new Date()
        }
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
    const sut = new TypeOrmMassDeletePermissionRepository();
    return {
        sut
    };
};
/* --------- TESTS --------- */

describe("Testa TypeOrmMassDeletePermissionRepository", () => {
    describe("Casos de sucesso", () => {
        test("Deve resolver com o número de exclusões", async () => {
            const { sut } = makeSut();
            const response = sut.delete([1,2]);
            await expect(response).resolves.toBe(2);
        });

        test("Deve persistir as exclusões no banco de dados", async () => {
            const { sut } = makeSut();
            const idList = [1,2];

            const repo = DbConnection.getInstance().getCollection(Permission);
            
            await sut.delete(idList);
            const permisssionsInRepo = await repo.find({});

            const ids = permisssionsInRepo.map(permission => permission.id);

            expect(ids).not.toContain(1);
            expect(ids).not.toContain(2);
        
        });

        test("Deve deletar zero se recebido array vazio", async () => {
            const { sut } = makeSut();
            const response = await sut.delete([]);
            expect(response).toBe(0);
            
        });
        test("Não deve alterar os dados do banco se recebido array vazio", async () => {
            const { sut } = makeSut();
            const repo = DbConnection.getInstance().getCollection(Permission);

            await sut.delete([]);
            const permisssionsInRepo = await repo.find({});

            expect(permisssionsInRepo).toHaveLength(3);
            
        });
    });
    describe("Casos de insucesso", () => {
    });
});