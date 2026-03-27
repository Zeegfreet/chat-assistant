import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Permission } from "@src/entitys/permission.entity";
import { User } from "@src/entitys/user.entity";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { In, QueryRunner } from "typeorm";

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
    
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);

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
        {
            id: 9,
            resource: "PERMANENTE",
            method: "CREANDO",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 10,
            resource: "PERMANENTE",
            method: "READY",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 11,
            resource: "PERMANENTE",
            method: "UPDATE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 12,
            resource: "PERMANENTE",
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

const sut = (params: any) => request.delete("/admin/permission")
    .set("Authorization", `Bearer ${accessToken}`)
    .send(params);

/* ---------- TESTS --------- */

describe("Testa rota /PERMISSION método DELETE", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar com status 200", async () => {
            const payload = {
                ids: [2,3,4]
            };

            const res = await sut(payload);

            expect(res.statusCode).toBe(200);
        });
        test("Deve retornar success: true e resources", async () => {
            const payload = {
                ids: [2,3,4]
            };

            const res = await sut(payload);

            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty("resources");
        });
        test("Deve retornar lista com os ids deletados", async () => {
            const payload = {
                ids: [2,3,4]
            };

            const res = await sut(payload);

            expect(res.body.resources).toStrictEqual(payload.ids);
        });
        test("Deve persistir no banco", async () =>{
            const payload = {
                ids: [2,3,4]
            };
            const repo = DbConnection.getInstance().getCollection(Permission);

            await sut(payload);
            const deletedPermissions = await repo.findBy({ id: In(payload.ids) });

            expect(deletedPermissions).toHaveLength(0);
        });

        test("Deve deletar apenas os registros listados", async () =>{
            const payload = {
                ids: [2,3,4]
            };
            const repo = DbConnection.getInstance().getCollection(Permission);

            await sut(payload);
            const deletedPermissions = await repo.find({});

            expect(deletedPermissions).toHaveLength(9);
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["ids não enviados no body", { }],
            ["ids vazio", { ids: []}],
            ["ids não numérico", { ids: ["ids", "ids2"] }]
        ])("Deve retornar status 400, %s", async (_, payload) => {
            
            const res = await sut(payload);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
    });
    describe("Edge cases", () => {
        test("Deve retornar confirmação de exclusão, se informados ids inexistentes", async () => {
            const payload = {
                ids: [13, 14, 15]
            };

            const res = await sut(payload);

            expect(res.statusCode).toBe(200);
            expect(res.body.resources).toStrictEqual(payload.ids);
        });
    });
});