import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Permission } from "@src/entitys/permission.entity";
import { User } from "@src/entitys/user.entity";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
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

beforeEach( async () => {

    const db = DbConnection.getInstance();
    manager = await db.createManager();
    await manager.startTransaction();
            
    db.setManager(manager);
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);
    
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
        {
            id: 5,
            resource: "PERMISSION",
            method: "CREATE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 6,
            resource: "PERMISSION",
            method: "READ",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 7,
            resource: "PERMISSION",
            method: "UPDATE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 8,
            resource: "PERMISSION",
            method: "DELETE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ];
    await permissionRepository.insert(testPermissions);
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

const sut = (data: Record<string | number, any>) => request.get("/admin/permission")
    .query(data)
    .set("Authorization", `Bearer ${accessToken}`);
/* ---------- TEST ---------- */

describe("Testa rota /PERMISSION metodo GET", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar status 200", async () => {
            const params = {};

            const res = await sut(params);

            expect(res.statusCode).toBe(200);
        });
        test("Deve retornar modelo de dados success: true e resources", async () => {
            const params = {};

            const res = await sut(params);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty("resources");
        });
        test("Deve listar todas permissões pesquisadas", async () => {
            const params = {};

            const res = await sut(params);

            expect(res.body.resources.data).toHaveLength(8);
        });
        test("Deve retornar em resources data, currentPage e totalPages", async () => {
            const params = {};

            const res = await sut(params);

            expect(res.body.resources).toHaveProperty("data");
            expect(res.body.resources).toHaveProperty("totalPages");
            expect(res.body.resources).toHaveProperty("currentPage");
        });

        test("Deve filtrar usando search corretamente", async () => {
            const params = {
                search: "upd"
            };

            const res = await sut(params);

            const data: Permission[] = res.body.resources.data;

            const responseMethods = data.map(item => item.method);

            expect(res.statusCode).toBe(200);
            expect(responseMethods).toContain("UPDATE");
            expect(responseMethods).not.toContain("CREATE");
        });

        test("Deve filtrar usando filter estritamente", async () => {
            const params = {
                filter: {
                    resource: "USERS"
                }
            };

            const res = await sut(params);

            const data: Permission[] = res.body.resources.data;

            const resources = data.map(item => item.resource);

            expect(res.statusCode).toBe(200);
            expect(resources).toContain("USERS");
            expect(resources).not.toContain("PERMISSION");
        });

        test("Deve respeitar o operador $gt", async () => {
            const params = {
                filter: {
                    id: { $gt: 6 }
                }
            };

            const res = await sut(params);

            const items: Permission[] = res.body.resources.data;

            const menorId = Math.min(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(menorId).toBe(7);
        });

        test("Deve respeitar o operador $gte", async () => {
            const params = {
                filter: {
                    id: { $gte: 6 }
                }
            };

            const res = await sut(params);

            const items: Permission[] = res.body.resources.data;

            const menorId = Math.min(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(menorId).toBe(6);
        });

        test("Deve respeitar o operador $lt", async () => {
            const params = {
                filter: {
                    id: { $lt: 6 }
                }
            };

            const res = await sut(params);

            const items: Permission[] = res.body.resources.data;

            const maiorId = Math.max(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(maiorId).toBe(5);
        });

        test("Deve respeitar o operador $lte", async () => {
            const params = {
                filter: {
                    id: { $lte: 6 }
                }
            };

            const res = await sut(params);

            const items: Permission[] = res.body.resources.data;

            const maiorId = Math.max(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(maiorId).toBe(6);
        });

        test("Deve respeitar o operador $between", async () => {
            const params = {
                filter: {
                    id: { $between: [2, 6] }
                }
            };

            const res = await sut(params);

            const items: Permission[] = res.body.resources.data;

            const maiorId = Math.max(...items.map(item => item.id));
            const menorId = Math.min(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(maiorId).toBe(6);
            expect(menorId).toBe(2);
        });

        test("Deve respeitar o campo limit para limitar os registros por páginas", async () => {
            const params = {
                limit: 2
            };

            const res = await sut(params);

            expect(res.statusCode).toBe(200);
            expect(res.body.resources.data).toHaveLength(2);
        });

        test("Deve respeitar o campo page para selecionar a página desejada", async () => {
            const page1 = {
                limit: 2,
                page: 1
            };

            const page2 = {
                limit: 2,
                page: 2
            };

            const res1 = await sut(page1);
            const res2 = await sut(page2);

            expect(res1.body.resources.currentPage).toBe(1);
            expect(res2.body.resources.currentPage).toBe(2);
            expect(res1.body.resources.data).toHaveLength(2);
            expect(res2.body.resources.data).toHaveLength(2);

        });

        test("Deve respeitar order", async () => {
            const params = {
                order: {
                    id: "DESC"
                }
            };

            const res = await sut(params);

            expect(res.statusCode).toBe(200);
            expect(res.body.resources.data[0]).toEqual(
                expect.objectContaining({
                    id: 8
                })
            );
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["page não numérico", { page: "abc" }],
            ["limit não numérico", { limit: "abc" }],
            ["page menor que 1", { page: 0 }],
            ["limit menor que 1", { limit: 0 }],
            ["order diferente de ASC ou DESC", { order: { test: "TEST" } }],
            ["order não é objeto", { order: "ASC" }],
            ["filter não é objeto", { filter: "id" }],
            ["search não é string", { search: { test: "ASD" } }],
            ["operador $between não recebeu array", { filter: {
                test: {
                    $between: "id"
                }
            } }]
        ])("Deve rejeitar com status 400, %s", async (_, params) => {
            const res = await sut(params);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("Edge cases", () => {
        test("Deve retornar data vazio e totalPages: 1 caso nada for encontrado", async () => {
            const params = {
                filter: {
                    resource: "INEXISTENTE"
                }
            };

            const res = await sut(params);

            expect(res.statusCode).toBe(200);
            expect(res.body.resources.data).toStrictEqual([]);
            expect(res.body.resources.currentPage).toBe(1);
            expect(res.body.resources.totalPages).toBe(1);
        });
    });
});