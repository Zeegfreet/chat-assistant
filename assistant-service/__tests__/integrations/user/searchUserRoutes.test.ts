import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { User } from "@src/entitys/user.entity";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { QueryRunner } from "typeorm";

let request: TestAgent;
let accessToken: string;
let manager: QueryRunner;
let testLength: number;

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
        id: 1,
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

    await userRepository
        .createQueryBuilder()
        .delete()
        .where("id != :id", { id: 1 })
        .execute();

    const aditionals = [1,2,3,4,5,6,7,8,9,10];

    const testUsers: Partial<User>[] = [
        {
            id: 2,
            name: "Joh Doe",
            email: "john@doe.com.br",
            password: "@JhonDoe1",
            isActive: true,
            isAdmin: false,
            isBlocked: true,
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            name: "Jane Doe",
            email: "jane@doe.com.br",
            password: "@JaneDoe1",
            isActive: false,
            isAdmin: true,
            isBlocked: false,
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 4,
            name: "Jordan Doe",
            email: "Jordan@doe.com.br",
            password: "@JordanDoe",
            isActive: true,
            isAdmin: false,
            isBlocked: false,
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        
    ].concat(aditionals.map(number => ({
        id: number + 4,
        name: `Test User ${number + 4}`,
        email: `test${number + 4}@test.com.br`,
        password: `@JaneDoe${number + 4}`,
        isActive: true,
        isAdmin: false,
        isBlocked: false,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
    })));
    await userRepository.insert(testUsers);
    testLength = testUsers.length + 1;
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

const sut = (data: Record<string | number, any>) => request.get("/admin/user")
    .query(data)
    .set("Authorization", `Bearer ${accessToken}`);

/* ---------- TEST ---------- */

describe("Testa rota /USER metodo GET", () => {
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
        test("Deve listar todos usuários pesquisados", async () => {
            const params = {};

            const res = await sut(params);

            expect(res.body.resources.data).toHaveLength(testLength);
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
                search: "Doe"
            };

            const res = await sut(params);

            const data: User[] = res.body.resources.data;

            const responseUsers = data.map(user => user.name);

            expect(res.statusCode).toBe(200);
            expect(responseUsers).toContain("Jane Doe");
            expect(responseUsers).not.toContain("Test");
        });

        test("Deve filtrar usando filter estritamente", async () => {
            const params = {
                filter: {
                    email: "john@doe.com.br",
                }
            };

            const res = await sut(params);

            const data: User[] = res.body.resources.data;

            const resources = data.map(item => item.email);

            expect(res.statusCode).toBe(200);
            expect(resources).toContain("john@doe.com.br");
            expect(resources).not.toContain("Jordan@doe.com.br");
            expect(resources).toHaveLength(1);
        });

        test("Deve respeitar o operador $gt", async () => {
            const limiterId = Math.ceil(testLength / 2);
            console.log(limiterId);
            const params = {
                filter: {
                    id: { $gt: limiterId }
                }
            };

            const res = await sut(params);

            const items: User[] = res.body.resources.data;

            const menorId = Math.min(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(menorId).toBe(limiterId +1);
        });

        test("Deve respeitar o operador $gte", async () => {
            const limiterId = Math.ceil(testLength / 2);
            const params = {
                filter: {
                    id: { $gte: limiterId }
                }
            };

            const res = await sut(params);

            const items: User[] = res.body.resources.data;

            const menorId = Math.min(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(menorId).toBe(limiterId);
        });

        test("Deve respeitar o operador $lt", async () => {
            const limiterId = Math.ceil(testLength / 2);
            const params = {
                filter: {
                    id: { $lt: limiterId }
                }
            };

            const res = await sut(params);

            const items: User[] = res.body.resources.data;

            const maiorId = Math.max(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(maiorId).toBe(limiterId -1);
        });

        test("Deve respeitar o operador $lte", async () => {
            const limiterId = Math.ceil(testLength / 2);
            const params = {
                filter: {
                    id: { $lte: limiterId }
                }
            };

            const res = await sut(params);

            const items: User[] = res.body.resources.data;

            const maiorId = Math.max(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(maiorId).toBe(limiterId);
        });

        test("Deve respeitar o operador $between", async () => {
            const minId = Math.ceil(testLength / 4);
            const maxId = Math.ceil(testLength / 4) * 3;
            const params = {
                filter: {
                    id: { $between: [minId, maxId] }
                }
            };

            const res = await sut(params);

            const items: User[] = res.body.resources.data;

            const maiorId = Math.max(...items.map(item => item.id));
            const menorId = Math.min(...items.map(item => item.id));

            expect(res.statusCode).toBe(200);
            expect(maiorId).toBe(maxId);
            expect(menorId).toBe(minId);
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

        test("Deve respeitar filtros de campos boleanos", async () => {
            const testPayload = {
                filter: {
                    isActive: false
                }
            };
            const res = await sut(testPayload);

            expect(res.statusCode).toBe(200);
            expect(res.body.resources.data).toHaveLength(1);

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
                    id: testLength
                })
            );
        });

        test.each([
            ["name exato", { name: "Jane Doe" }],
            ["email exato", { email: "jane@doe.com.br" }],
            ["isActive true", { isActive: true }],
            ["isActive false", { isActive: false }],
            ["isAdmin true", { isAdmin: true }],
            ["isAdmin false", { isAdmin: false }],
            ["isBlocked true", { isBlocked: true }],
            ["isBlocked false", { isBlocked: false }],
            ["isVerified true", { isVerified: true }],
            ["isVerified false", { isVerified: false }],
        ])("Deve respeitar filter por %s", async (_, filter) => {
            const res = await sut({ filter });

            const results: any[] = res.body.resources.data;

            expect(results.length).toBeGreaterThanOrEqual(0);

            for (const [key, value] of Object.entries(filter)) {
                expect(results.every(item => item[key] === value)).toBe(true);
            }
        });

        test.each([
            ["isActive, isAdmin", { isActive: true, isAdmin: false }],
            ["isActive, isBlocked",{ isActive: true, isBlocked: false }],
            ["isActive, isVerified",{ isActive: true, isVerified: true }],
            ["isAdmin, isBlocked",{ isAdmin: true, isBlocked: false }],
            ["name, isActive",{ name: "Jane Doe", isActive: true }],
            ["email, isVerified",{ email: "jane@doe.com.br", isVerified: false }],
            ["isActive, isAdmin, isblocked",{ isActive: true, isAdmin: false, isBlocked: false }],
            ["isActive, isAdmin, isVerified",{ isActive: true, isAdmin: false, isVerified: true }],
            ["name, isActive, isAdmin",{ name: "Jane Doe", isActive: true, isAdmin: false }],
        ])("Deve respeitar combinação de filtros em filter %s", async (_, filter) => {
            const res = await sut({ filter });
            const results: any[] = res.body.resources.data;

            results.forEach(item => {
                for (const [key, value] of Object.entries(filter)) {
                    expect(item[key]).toBe(value);
                }
            });
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

        test("Deve retornar erro 401, pois usuário não está logado", async () => {
            const params = {
                role: "Test Failed Role",
                description: "Test Failed Description"
            };
            const res = await sut(params)
                .unset("Authorization");

            expect(res.statusCode).toBe(401);
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
                    name: "INEXISTENTE"
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