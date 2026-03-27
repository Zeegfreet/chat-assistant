import { TypeOrmLoadAuthUserByEmailRepository } from "./../../../../../src/infra/db/repositories/user/typeOrmLoadAuthUserByEmailRepository";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Permission } from "@src/entitys/permission.entity";
import { Role } from "@src/entitys/role.entity";
import { User } from "@src/entitys/user.entity";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
});

beforeEach(async () => {
    const userRepository = DbConnection
        .getInstance()
        .getCollection(User);
    const roleRepository = DbConnection
        .getInstance()
        .getCollection(Role);
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);

    await userRepository.clear();
    await roleRepository.clear();
    await permissionRepository.clear();

    const permissionsToInsert: Partial<Permission>[] = [
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
        }
    ];

    await permissionRepository.insert(permissionsToInsert);

    const findPermissions = await permissionRepository.find({});

    const roleToInsert1 = roleRepository.create({
        id: 1,
        role: "Test Role 1",
        description: "Test description",
        isActive: true,
        isDefault: true,
        permissions: findPermissions,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const roleToInsert2 = roleRepository.create({
        id: 2,
        role: "Test Role 2",
        description: "Test description 2",
        isActive: true,
        isDefault: true,
        permissions: [findPermissions.pop()],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const roleToInsert3 = roleRepository.create({
        id: 3,
        role: "Test Role Inativa",
        description: "Test description 3",
        isActive: false,
        isDefault: true,
        permissions: [findPermissions[0]],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    await roleRepository.save(roleToInsert1);
    await roleRepository.save(roleToInsert2);
    await roleRepository.save(roleToInsert3);

    const roles = await roleRepository.find({ relations: ["permissions"] });

    const testUserPayload = {
        id: 1,
        name: "Test User",
        email: "test@test.tt",
        password: "testPassword",
        isAdmin: false,
        isActive: false,
        isBlocked: false,
        isDeleted: false,
        isVerified: false,
        roles: roles,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const userToAdd = await userRepository.create(testUserPayload);
    await userRepository.save(userToAdd);
    
});

afterAll( async () => {
    DbConnection
        .getInstance()
        .disconnect();
});

/* --------- SUT --------- */

const makeSut = () => {
    const sut = new TypeOrmLoadAuthUserByEmailRepository();

    return {
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa typeOrmLoadAuthUserByEmailRepository", () => {
    describe("Casos de sucesso", () => {
        const payload = "test@test.tt";
        test("Deve consultar usuário com sucesso", async () => {
            const { sut } = makeSut();

            const expected = { email: payload };

            const request = sut.loadByEmail(payload);

            await expect(request).resolves.toMatchObject(expected);

        });

        test("Deve retornar as propriedades corretas", async () => {
            const { sut } = makeSut();

            const request = await sut.loadByEmail(payload);

            expect(request).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    isAdmin: expect.any(Boolean),
                    isBlocked: expect.any(Boolean),
                    isActive: expect.any(Boolean),
                    password: expect.any(String),
                    roles: expect.any(Array),
                    permissions: expect.any(Array)
                })
            );

        });

        test("As roles devem ser convertidas em um array de strings", async () => {
            const { sut } = makeSut();

            const request = await sut.loadByEmail(payload);

            expect(request.roles).toEqual(
                expect.arrayContaining([
                    expect.any(String)
                ])
            );
        });

        test("As permissions devem retornar um array de objetos com resource e method", async () => {
            const { sut } = makeSut();

            const request = await sut.loadByEmail(payload);

            expect(request.permissions).toEqual(
                expect.arrayContaining([
                    {
                        resource: expect.any(String),
                        method: expect.any(String),
                    }
                ])
            );
        });

        test("Não deve retornar roles inativas", async () => {
            const { sut } = makeSut();

            const request = await sut.loadByEmail(payload);
            
            expect(request.roles).not.toEqual(
                expect.arrayContaining([
                    "Test Role Inativa"
                ])
            );
        });
        
    });
    describe("Casos de insucesso", () => {
       
        test("Deve retornar null se usuário não for encontrado", async () => {
            const { sut } = makeSut();
            const payload = "test2@test.tt";

            const request = sut.loadByEmail(payload);
            
            await expect(request).resolves.toBeNull();
        });

        test("Não deve retornar usuário softDeleted", async () => {
            const { sut } = makeSut();
            const payload = "test@test.tt";

            const repo = DbConnection.getInstance().getCollection(User);

            const user = await repo.findOneBy({});

            await repo.softRemove(user);

            const request = sut.loadByEmail(payload);
            
            await expect(request).resolves.toBeNull();
        });
    });
});