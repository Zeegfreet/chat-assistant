import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmAddRoleRepository } from "@db/db/repositories";
import { AlreadyExistsError } from "@domain/errors/AlreadyExistsError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AddRoleRepository } from "@domain/index";
import { Permission } from "@src/entitys/permission.entity";
import { Role } from "@src/entitys/role.entity";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
});

beforeEach(async () => {
    const roleRepository = DbConnection
        .getInstance()
        .getCollection(Role);
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);
        
    await roleRepository.clear();
    await permissionRepository.clear();

    const permission1 = permissionRepository.create({
        id: 1,
        resource: "TEST_PERMISSIPON",
        method: "TEST_METHOD"
    });
    const permission2 = permissionRepository.create({
        id: 2,
        resource: "TEST_PERMISSIPON_2",
        method: "TEST_METHOD_2"
    });

    await permissionRepository.save(permission1);
    await permissionRepository.save(permission2);

    const testRoles: Role[]  = [
        {
            id: 1,
            role: "TEST_ROLE",
            description: "Role criada para testes",
            isActive: true,
            isDefault: false,
            permissions: [permission1, permission2],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    await roleRepository.insert(testRoles);
        
});

afterAll(async () => {
    await DbConnection
        .getInstance()
        .disconnect();
});

/* --------- SUT --------- */

const makeSut = () => {
    const sut = new TypeOrmAddRoleRepository();
    return {
        sut
    };
};
/* --------- TESTS --------- */

describe("Testa TypeOrmAddRoleRepository", () => {
    describe("Casos de sucesso", () => {
        const successPayload: AddRoleRepository.Params = {
            role: "QA Analyst",
            description: "Role criada para testes",
            permissions: [{ id: 1 }, { id: 2 }],
            isActive: true,
            isDefault: false,
        };
        test("Deve resolver com os dados da Role criada", async () => {
            const { sut } = makeSut();

            const res = sut.add(successPayload);

            await expect(res).resolves.toMatchObject(successPayload);
        });
        test("Deve persistir os dados no banco", async () => {
            const { sut } = makeSut();
            const repo = DbConnection.getInstance().getCollection(Role);

            await sut.add(successPayload);

            const find = await repo.findOneBy({ role: successPayload.role });

            expect(find).toMatchObject({ role: successPayload.role });
        });
        test("Novo cadastro deve vincular as permissões corretamente", async () => {
            const { sut } = makeSut();

            const res = await sut.add(successPayload);

            expect(res.permissions).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 1
                    })
                ])
            );
        });
    });
    describe("Casos de insucesso", () => {
        test("Deve rejeitar com instancia de AlreadyExistsError se já existir", async () => {
            const payload: AddRoleRepository.Params = {
                role: "TEST_ROLE",
                description: "Role criada para testes",
                permissions: [{ id: 1 }, { id: 2 }],
                isActive: true,
                isDefault: false,
            };
            const { sut } = makeSut();

            const res = sut.add(payload);

            await expect(res).rejects.toBeInstanceOf(AlreadyExistsError);
        });

        test("Se id da permissão inserida não existir, deve rjeitar com NotFoundError", async () => {
            const payload: AddRoleRepository.Params = {
                role: "Pass Role",
                description: "Role criada para testes",
                permissions: [{ id: 9 }, { id: 2 }],
                isActive: true,
                isDefault: false,
            };
            const { sut } = makeSut();

            const res = sut.add(payload);

            await expect(res).rejects.toBeInstanceOf(NotFoundError);
        });
    });
});