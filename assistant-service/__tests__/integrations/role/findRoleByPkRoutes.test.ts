import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Role } from "@src/entitys/role.entity";
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

    const testRole = roleRepository.create({
        id: 1,
        role: "Tester",
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

const sut = (id: string | number) => request.get(`/admin/role/${id}`)
    .set("Authorization", `Bearer ${accessToken}`);

/* ---------- TEST ---------- */

describe("Testa rota /ROLE/:ID método GET", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar status 200", async () => {
            const id = 2;
            
            const res = await sut(id);

            expect(res.statusCode).toBe(200);
        });
        test("Deve retornar as propriedades success: true e resources", async () => {
            const id = 2;
            
            const res = await sut(id);

            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty("resources");
        });

        test("Deve retornar o registro correto", async () => {
            const id = 2;
            
            const res = await sut(id);

            expect(res.body.resources).toEqual(
                expect.objectContaining({
                    id: id
                })
            );
        });

        test("Deve retornar o modelo correto de dados", async () => {
            const id = 2;
            
            const res = await sut(id);

            expect(res.body.resources).toEqual({
                id: expect.any(Number),
                role: expect.any(String),
                description: expect.any(String),
                isActive: expect.any(Boolean),
                isDefault: expect.any(Boolean),
                permissions: expect.any(Array),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["id não númerico", "abc"],
            ["id é undefined", undefined],
            ["id é null", null],
        ])("Deve retornar status 400, %s", async (_, id) => {
            
            const res = await sut(id);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
        test("Deve retornar status 404, registro não encontrado", async () => {
            const id = 99;
            
            const res = await sut(id);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
    });
});