import { DbConnection } from "@db/db/config/dbConnection";
import request from "supertest";
import TestAgent from "supertest/lib/agent";
import { dbConfig } from "@app/config/dbConfig";
import { createApp } from "@app/app";
import { hashFactory } from "@app/factories/criptography/hashFactory";
import { User } from "@src/entitys/user.entity";
import { Role } from "@src/entitys/role.entity";
import { Permission } from "@src/entitys/permission.entity";
import { QueryRunner } from "typeorm";

let api: TestAgent;
let manager: QueryRunner;

beforeAll( async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());

    const app = await createApp();
    api = request(app);
});

beforeEach(async () => {
    const db = DbConnection.getInstance();
    manager = await db.createManager();
    await manager.startTransaction();
    db.setManager(manager);

    const hasher = hashFactory();
    const userRepository = DbConnection
        .getInstance()
        .getCollection(User);
    const roleRepository = DbConnection
        .getInstance()
        .getCollection(Role);
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);

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

    const testUserPayload: User = userRepository.create({
        id: 10,
        name: "Usuario Teste Fixo",
        email: "testefixo@teste.com.br",
        password: await hasher.hash("@SenhaMock1"),
        isAdmin: false,
        isActive: true,
        isBlocked: false,
        isDeleted: false,
        roles: roles,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const testUserPayload2: User = userRepository.create({
        id: 99,
        name: "Usuario Teste 99",
        email: "testefixo99@teste.com.br",
        password: await hasher.hash("@SenhaMock1"),
        isAdmin: false,
        isActive: false,
        isBlocked: false,
        isDeleted: false,
        roles: roles,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await userRepository.save(testUserPayload);
    await userRepository.save(testUserPayload2);
    
});

afterEach(async () => {
    await manager.rollbackTransaction();
    await manager.release();

    DbConnection.getInstance().setManager(undefined);
});

afterAll( async () => {
    await DbConnection
        .getInstance()
        .disconnect();
});

/* --------- MOCKS --------- */

const signInRoute = "/auth/signin";

/* --------- TESTS --------- */

describe("Testa rotas /SIGNIN método POST", () => {
    describe("Casos de sucesso", () =>{
        const mockPayload = {
            email: "testefixo@teste.com.br",
            password: "@SenhaMock1"
        };
            
        test("Deve retornar status 200, caso credenciais válidas", async () => {
            const response = await api.post(signInRoute).send(mockPayload);
            expect(response.status).toBe(200);
        });
        test("Deve retornar as propriedades success: true e resources, caso credenciais válidas", async () => {
            const response = await api.post(signInRoute).send(mockPayload);
            expect(response.body).toHaveProperty("success");
            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty("resources");
        });
        test("Deve retornar os dados do usuário, accessToken e refreshToken", async () => {
            const response = await api.post(signInRoute).send(mockPayload);
            expect(response.body.resources).toEqual({
                user: {
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    isAdmin: expect.any(Boolean),
                    roles: expect.arrayContaining([
                        expect.any(String)
                    ]),
                    permissions: expect.arrayContaining([
                        {
                            resource: expect.any(String),
                            method: expect.any(String)
                        }
                    ]),
                },
                accessToken: expect.any(String),
                refreshToken: expect.any(String)
            });
            
        });
        test("O usuário retornado deve ser o mesmo enviado na requisição", async () => {
            const response = await api.post(signInRoute).send(mockPayload);
            const emailRetornado = response.body.resources.user.email;
            expect(emailRetornado).toBe(mockPayload.email);
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["password inválido", {
                email: "testefixo@teste.com.br",
                password: "@Inválida"
            }],
            ["email não cadastrado", {
                email: "emailnaocadastrado@teste.com.br",
                password: "@SenhaMock1"
            }]
        ])("Deve rejeitar com status 401 por %s", async (_, mockPayload) => {
            const response = await api.post(signInRoute).send(mockPayload);
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("success");
            expect(response.body).toHaveProperty("error");
            expect(response.body).toHaveProperty("message");
            expect(response.body.success).toBe(false);
            expect(response.headers["set-cookie"]).toBeUndefined();

        });

        test.each([
            ["email não enviado", {
                email: "testefixo@teste.com.br",
            }],
            ["password não enviado", {
                password: "@SenhaMock1"
            }],
            ["email e senha não enviados", {
            }],
            ["email não é um email válido", {
                email: "emailinválido",
                password: "@SenhaMock1"
            }]
        ])("Deve rejeitar com status 400 por %s", async (_, mockPayload) => {
            const response = await api.post(signInRoute).send(mockPayload);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("success");
            expect(response.body).toHaveProperty("error");
            expect(response.body).toHaveProperty("message");
            expect(response.body.success).toBe(false);
            expect(response.headers["set-cookie"]).toBeUndefined();

        });
        
        test("Deve rejeitar com status 401 se o usuário tiver sido softDeleted", async () => {
            const repository = DbConnection.getInstance().getCollection("User");
            const userToSoftDelete = await repository.findOneBy({ id: 10});
            const userSoftDeletedCredentials = {
                email: "testefixo@teste.com.br",
                password:"@SenhaMock1"
            };
            await repository.softRemove(userToSoftDelete);
            const response = await api.post(signInRoute).send(userSoftDeletedCredentials);
            expect(response.headers["set-cookie"]).toBeUndefined();

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("success");
            expect(response.body).toHaveProperty("error");
            expect(response.body).toHaveProperty("message");
            expect(response.body.success).toBe(false);
            expect(response.headers["set-cookie"]).toBeUndefined();
        });

        test("Deve rejeitar ocm status 403 se usuário estiver bloqueado", async () => {
            const repository = DbConnection.getInstance().getCollection("User");
            await repository.update({ id: 10 }, { isBlocked: true });

            const response = await api.post(signInRoute).send({
                email: "testefixo@teste.com.br",
                password: "@SenhaMock1"
            });

            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty("success");
            expect(response.body).toHaveProperty("error");
            expect(response.body).toHaveProperty("message");
            expect(response.body.success).toBe(false);
            expect(response.headers["set-cookie"]).toBeUndefined();
        });

        test("Deve rejeitar com status 403 se usuário estiver inativo", async () => {
            const repository = DbConnection.getInstance().getCollection("User");
            await repository.update({ id: 10 }, { isActive: false });

            const response = await api.post(signInRoute).send({
                email: "testefixo@teste.com.br",
                password: "@SenhaMock1"
            });

            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty("success");
            expect(response.body).toHaveProperty("error");
            expect(response.body).toHaveProperty("message");
            expect(response.body.success).toBe(false);
            expect(response.headers["set-cookie"]).toBeUndefined();
        });
            
    });
    
});