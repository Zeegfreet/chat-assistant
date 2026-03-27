import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmDeletePermissionRepository } from "@db/db/repositories/permission/typeOrmDeletePermissionRepository";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { AddPermissionRepository } from "@domain/index";
import { Permission } from "@src/entitys/permission.entity";

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
    const sut = new TypeOrmDeletePermissionRepository();
    return {
        sut
    };
};
/* --------- TESTS --------- */

describe("Testa TypeOrmDeletePermissionRepository", () => {
    describe("Casos de sucesso", () => {
        test("Deve resolver sem conteúdo", async () => {
            const { sut } = makeSut();
            const response = sut.delete(1);
            await expect(response).resolves.toBeUndefined();
        });
        test("Deve deletar o dado no banco de dados", async () => {
            const id = 1;
            const { sut } = makeSut();
            const repo = DbConnection.getInstance().getCollection(Permission);

            await sut.delete(id);
            const findById = await repo.findOneBy({ id });

            expect(findById).toBeNull();
        });

        test("Deve deletar somente o registro que contém o id informado", async () => {
            const id = 1;
            const { sut } = makeSut();
            const repo = DbConnection.getInstance().getCollection(Permission);

            await sut.delete(id);
            const findById = await repo.findOneBy({ id: 2 });

            expect(findById).toEqual(
                expect.objectContaining({
                    id: 2
                })
            );
        });
    });
    describe("Casos de insucesso e edge cases", () => {
        test("Deve rejeitar com instance de NotFoundError", async () => {
            const id = 3;
            const { sut } = makeSut();

            const res = sut.delete(id);

            await expect(res).rejects.toBeInstanceOf(NotFoundError);

        });

        test("Deve retornar erro se fornecido id undefined", async () => {
            const id: any = undefined;
            const { sut } = makeSut();
            
            const res = sut.delete(id);
            
            await expect(res).rejects.toBeInstanceOf(ValidationError);
        });
    });
});