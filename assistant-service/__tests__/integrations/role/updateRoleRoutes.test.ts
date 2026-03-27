import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Permission } from "@src/entitys/permission.entity";
import { Role } from "@src/entitys/role.entity";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import crypto from "crypto";
import { QueryRunner } from "typeorm";
import { User } from "@src/entitys/user.entity";

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

beforeEach( async () => {
    const db = DbConnection.getInstance();
    manager = await db.createManager();
    await manager.startTransaction();
                                    
    db.setManager(manager);
        
    const userRepository = DbConnection.getInstance().getCollection(User);
                                            
    await userRepository.insert({
        name: "Joh Doe",
        email: "john@doe.com.br",
        password: "$2b$04$HSpE9khsw/2t9Xmrp0PgweyNdjVR8126KQyqp6gmzzVt5QTFDEzH6",
        isAdmin: true
    });
                                                
    const response = await request.post("/auth/signin")
        .send({
            email: "john@doe.com.br",
            password: "@JhonDoe1"
        });
                                                
    accessToken = response.body.resources.accessToken;

    const roleRepository = DbConnection
        .getInstance()
        .getCollection(Role);
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);

    const permission1 = permissionRepository.create({
        id: 1,
        resource: "TEST",
        method: "CREATE"
    });

    const permission2 = permissionRepository.create({
        id: 2,
        resource: "TEST",
        method: "UPDATE"
    });

    const permission3 = permissionRepository.create({
        id: 3,
        resource: "TEST",
        method: "READ"
    });

    await permissionRepository.save(permission1);
    await permissionRepository.save(permission2);
    await permissionRepository.save(permission3);

    const testRole = roleRepository.create({
        id: 1,
        role: "Tester 1",
        description: "Testar o sistema",
        isActive: true,
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const testRole2 = roleRepository.create({
        id: 2,
        role: "Tester 2",
        description: "Testar o sistema 2",
        isActive: true,
        isDefault: false,
        permissions: [permission1, permission2],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    await roleRepository.save(testRole);
    await roleRepository.save(testRole2);

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

const sut = (id: string | number, payload: any) => request.patch(`/admin/role/${id}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send(payload);

/* ---------- TEST ---------- */

describe("Testa rota /ROLE/:ID método PATCH", () => {
    describe("Casos de sucesso", () => {
        const testId = 2;
        const testPayload = {
            role: "Updated Test Role",
            description: "testa atualizar Role",
            isActive: false,
            isDefault: true,

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
                description: testPayload.description
            };
            const res = await sut(testId, testPartialPayload);
            expect(res.statusCode).toBe(200);
            expect(res.body.resources).toMatchObject(testPartialPayload);
        });

        test("A atualização deve persistir no banco de dados", async () => {
            const repo = DbConnection.getInstance().getCollection(Role);
            
            await sut(testId, testPayload);

            const updatedRole = await repo.findOneBy({ id: testId });
            
            expect(updatedRole).toMatchObject(testPayload);
        });
        
    });

    describe("Casos de insucesso", () => {
        test.each([
            ["id não é numérico", "abc", { description: "Descrição válida" }],
            ["id não é null", null, { description: "Descrição válida" }],
            ["id não é undefined", undefined, { description: "Descrição válida" }],
            ["payload vazio", 2, {  }],
            ["role não é string", 2, { role: 1, description: "Descrição válida" }],
            ["description não é string", 2, { role: "Role Válida", description: true }],
            ["role com menos de 5 dígitos", 2, { role: "tr", description: "Descrição válida"  }],
            ["role com mais de 50 dígitos", 2, { role: gerarStringLonga(), description: "Descrição válida"  }],
            ["description com menos de 5 dígitos", 2, { role: "Role Válida", description: "quat"  }],
            ["description com menos de 250 dígitos", 2, { role: "Role Válida", description: gerarStringLonga(251)  }],
            ["isActive string", 2, { role: "Role Válida", description: "Descrição válida", isActive: "sim"  }],
            ["isDefault string", 2, { role: "Role Válida", description: "Descrição válida", isDefault: "sim"  }],
            ["permissions string", 2, { role: "Role Válida", description: "Descrição válida", permissions: "CREATE"  }],
            ["permissions array de números", 2, { role: "Role Válida", description: "Descrição válida", permissions: [2,3,5]  }],
            ["objetos em permissions não possuem id", 2, { role: "Role Válida", description: "Descrição válida", permissions: [{ resource: "PERMISSION" }]  }],
        ])("Deve retornar status 400, %s", async (_, id, payload) => {
            const res = await sut(id, payload);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar erro 401, pois usuário não está logado", async () => {
            const id = 2;
            const payload = {
                role: "Tester 1",
            };
            const res = await sut(id, payload)
                .unset("Authorization");

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar status 409, role já cadastrada", async () => {
            const id = 2;
            const payload = {
                role: "Tester 1",
            };

            const res = await sut(id, payload);

            expect(res.statusCode).toBe(409);
        });
    });

    describe("Edge cases", () => {
        
        test("Deve desvincular todas permissões", async () => {
            const testId = 2;
            const testPayload = {
                permissions: [] as []

            };
            const res = await sut(testId, testPayload);
            expect(res.body.resources.permissions).toHaveLength(0);
        });

        test("Deve substituir as permissões listadas pelas novas", async () => {
            const testId = 2;
            const testPayload = {
                permissions: [{ id: 2}, { id: 3 }]

            };
            const res = await sut(testId, testPayload);
            const permissions: Permission[] = res.body.resources.permissions;
            const returnedPermissions = permissions.map(permission => permission.id);
            expect(returnedPermissions).toContain(2);
            expect(returnedPermissions).toContain(3);
            expect(returnedPermissions).not.toContain(1);
        });
    });
});