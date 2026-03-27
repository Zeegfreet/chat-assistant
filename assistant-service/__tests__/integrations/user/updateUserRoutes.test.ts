import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Role } from "@src/entitys/role.entity";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import crypto from "crypto";
import { User } from "@src/entitys/user.entity";
import { QueryRunner } from "typeorm";

let request: TestAgent;
let accessToken: string;
let manager: QueryRunner;

beforeAll( async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());

    const app = await createApp();
    request = supertest(app);
    
});

beforeEach(async () => {
    const db = DbConnection.getInstance();
    manager = await db.createManager();
    await manager.startTransaction();
                                                
    db.setManager(manager);
                    
    const userRepository = DbConnection.getInstance().getCollection(User);
                                                        
    await userRepository.insert({
        id: 99,
        name: "Johana Doe",
        email: "johana@doe.com.br",
        password: "$2b$04$HSpE9khsw/2t9Xmrp0PgweyNdjVR8126KQyqp6gmzzVt5QTFDEzH6",
        isAdmin: true
    });
                                                            
    const response = await request.post("/auth/signin")
        .send({
            email: "johana@doe.com.br",
            password: "@JhonDoe1"
        });
                                                            
    accessToken = response.body.resources.accessToken;
    const roleRepository = DbConnection
        .getInstance()
        .getCollection(Role);

    const testRole  = roleRepository.create({
        id: 1,
        role: "Tester",
        description: "Testar o sistema",
        isActive: true,
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const testRole2  = roleRepository.create({
        id: 2,
        role: "Tester2",
        description: "Testar o sistema",
        isActive: true,
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const testRole3  = roleRepository.create({
        id: 3,
        role: "Tester3",
        description: "Testar o sistema",
        isActive: true,
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    await roleRepository.save(testRole);
    await roleRepository.save(testRole2);
    await roleRepository.save(testRole3);

    const testUser = userRepository.create({
        id: 1,
        name: "Joh Doe",
        email: "john@doe.com.br",
        password: "@JhonDoe1",
        roles: [testRole],
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
        roles: [],
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

/* ---------- SUT --------- */

function gerarStringLonga(tamanho = 55) {
    // Gera bytes aleatórios e converte para hexadecimal
    return crypto
        .randomBytes(Math.ceil(tamanho / 2))
        .toString("hex")
        .slice(0, tamanho);
}
/* ---------- SUT --------- */

const sut = (id: string | number, payload: any) => request.patch(`/admin/user/${id}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send(payload);

/* ---------- TEST ---------- */

describe("Testa rota /ROLE/:ID método PATCH", () => {
    describe("Casos de sucesso", () => {
        const testId = 2;
        const testPayload = {
            name: "Jane Doe Updated",
            email: "jane.updated@doe.com.br",
            roles: [{ id: 1 }],
            isActive: false,
            isAdmin: true,
            isBlocked: true,
            isVerified: false,
        };
        test("Deve retornar status 200", async () => {
            const res = await sut(testId, testPayload);
            expect(res.statusCode).toBe(200);
        });
        test("Deve retornar com success: true e resource", async () => {
            const res = await sut(testId, testPayload);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty("resources");
        });
        test("Os dados atualizados devem colidir com payload", async () => {
            const res = await sut(testId, testPayload);
            expect(res.body.resources).toMatchObject(testPayload);
        });

        test("Deve atualizar parcialmente os dados", async () => {
            const testPartialPayload = {
                name: "Jane Doe Updated",
                email: "jane.updated@doe.com.br",
            };
            const res = await sut(testId, testPartialPayload);
            expect(res.statusCode).toBe(200);
            expect(res.body.resources).toMatchObject(testPartialPayload);
        });

        test("A atualização deve persistir no banco de dados", async () => {
            const repo = DbConnection.getInstance().getCollection(User);
            
            await sut(testId, testPayload);

            const updatedUser = await repo.findOne({ where: { id: testId }, relations: ["roles"] });
            
            expect(updatedUser).toMatchObject(testPayload);
        });
        
    });

    describe("Casos de insucesso", () => {
        test.each([
            ["id não é numérico", "abc", { description: "Descrição válida" }],
            ["id não é null", null, { description: "Descrição válida" }],
            ["id não é undefined", undefined, { description: "Descrição válida" }],
            ["payload vazio", 2, {  }],
            ["payload com campo name muito curto", 2, { name: "Jo" }],
            ["payload com campo name muito longo", 2, { name: gerarStringLonga(51) }],
            ["payload com email inválido", 2, { email: "emailinvalido" }],
            ["payload com password sem número", 2, { password: "@JaneDoe" }],
            ["payload com password sem letra maiúscula", 2, { password: "@janedoe1" }],
            ["payload com password sem letra minúscula", 2, { password: "@JANEDOE1" }],
            ["payload com password sem caractere especial", 2, { password: "JaneDoe12" }],
            ["payload com password com espaço", 2, { password: "@Jane Doe1" }],
            ["payload com password muito curto", 2, { password: "@Ja1" }],
            ["payload com password muito longo", 2, { password: gerarStringLonga(17) }],
            ["payload com role id não numérico", 2, { roles: [{ id: "abc" }] }],
            ["payload com role id null", 2, { roles: [{ id: null }] }],
            ["payload com role id undefined", 2, { roles: [{ id: undefined }] }],
            // ["payload com role id duplicado", 2, { roles: [{ id: 1 }, { id: 1 }] }],
            ["payload com. isActive não booleano", 2, { isActive: "true" }],
            ["payload com. isAdmin não booleano", 2, { isAdmin: "true" }],
            ["payload com. isBlocked não booleano", 2, { isBlocked: "true" }],
            ["payload com. isVerified não booleano", 2, { isVerified: "true" }],
        ])("Deve retornar status 400, %s", async (_, id, payload) => {
            const res = await sut(id, payload);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar status 409, email já cadastrado para outro usuário", async () => {
            const id = 2;
            const payload = {
                email: "john@doe.com.br",
            };
            
            const res = await sut(id, payload);

            expect(res.statusCode).toBe(409);
        });
    });

    describe("Edge cases", () => {
        
        test("Deve desvincular todas roles", async () => {
            const testId = 2;
            const testPayload = {
                roles: [] as []

            };
            const res = await sut(testId, testPayload);
            expect(res.body.resources.roles).toHaveLength(0);
        });

        test("Deve substituir as roles listadas pelas novas", async () => {
            const testId = 2;
            const testPayload = {
                roles: [{ id: 2}, { id: 3 }]

            };
            const res = await sut(testId, testPayload);
            const roles: Role[] = res.body.resources.roles;
            const returnedRoles = roles.map(role => role.id);
            expect(returnedRoles).toContain(2);
            expect(returnedRoles).toContain(3);
            expect(returnedRoles).not.toContain(1);
        });

        test("Deve retornar status 404, usuário não encontrado para atualização", async () => {
            const id = 99999;
            const payload = {
                email: "john@doe.com.br",
            };
            
            const res = await sut(id, payload);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar status 409, usuário não pode inativar o próprio cadastro", async () => {
            const id = 99;
            const payload = {
                isActive: false
            };
            
            const res = await sut(id, payload);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar status 409, usuário não pode bloquear o próprio cadastro", async () => {
            const id = 99;
            const payload = {
                isBlocked: true
            };
            
            const res = await sut(id, payload);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar status 409, usuário não pode remover os próprios privilégios de administrador", async () => {
            const id = 99;
            const payload = {
                isAdmin: false
            };
            
            const res = await sut(id, payload);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
    });
});