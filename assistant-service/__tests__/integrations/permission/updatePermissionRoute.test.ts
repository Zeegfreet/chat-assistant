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

    const testPermission = permissionRepository.create({
        id: 1,
        resource: "RESOURCETEST",
        method: "CREATE",
    });

    const testPermission2 = permissionRepository.create({
        id: 2,
        resource: "RESOURCETEST2",
        method: "UPDATE",
    });

    await permissionRepository.save(testPermission);
    await permissionRepository.save(testPermission2);
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

const sut = (id: string | number, payload: any) => request.patch(`/admin/permission/${id}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send(payload);

/* ---------- TEST ---------- */

describe("Testa rota /PERMISSION/:ID método PATCH", () => {
    describe("Casos de sucesso", () => {
        const testId = 2;
        const testPayload = {
            resource: "UPDATEDRESOURCE"
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
        test("Deve retornar com os dados do usuário atualizado", async () => {
            const res = await sut(testId, testPayload);
            expect(res.body.resources).toMatchObject(testPayload);
        });

        test("Deve persistir os dados no banco", async () => {
            const repo = DbConnection.getInstance().getCollection("Permission");
            
            await sut(testId, testPayload);

            const updatedPermission = await repo.findOneBy({ id: testId });
            
            expect(updatedPermission).toMatchObject(testPayload);
        });
    });

    describe("Casos de insucesso", () => {
        test.each([
            ["id não é numérico", "abc", { resource: "TESTUPDATE" }],
            ["id não é null", null, { resource: "TESTUPDATE" }],
            ["id não é undefined", undefined, { resource: "TESTUPDATE" }],
            ["resource tem menos de 3 dígitos", 2, { resource: "AS" }],
            ["resource tem mais de 50 dígitos", 2, { resource: "TESTUPDATETESTUPDATETESTUPDATETESTUPDATETESTUPDATE1" }],
            ["method tem menos de 3 dígitos", 2, { method: "AS" }],
            ["method tem mais de 50 dígitos", 2, { method: "TESTUPDATETESTUPDATETESTUPDATETESTUPDATETESTUPDATE1" }],
            ["payload vazio", 2, { }],
        ])("Deve retornar status 400, %s", async (_, id, payload) => {
            const res = await sut(id, payload);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar status 409, permissão já cadastrada", async () => {
            const id = 2;
            const payload = {
                resource: "RESOURCETEST",
                method: "CREATE",
            };

            const res = await sut(id, payload);

            expect(res.statusCode).toBe(409);
        });
    });
});