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
        method: "METHODTEST",
    });

    const testPermission2 = permissionRepository.create({
        id: 2,
        resource: "RESOURCETEST2",
        method: "METHODTEST2",
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

const sut = (id: string | number) => request.delete(`/admin/permission/${id}`)
    .set("Authorization", `Bearer ${accessToken}`);

/* ---------- TESTS --------- */

describe("Testa rota /PERMISSION método DELETE", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar status 204, sem body", async () => {
            const id = 1;
            const res = await sut(id);

            expect(res.statusCode).toBe(204);
        });

        test("Deve persistir a alteração no banco", async () => {
            const id = 1;
            const repo = DbConnection.getInstance().getCollection("Permission");
            
            await sut(id);

            const findByIdPermission = await repo.findOneBy({ id });

            expect(findByIdPermission).toBeNull();
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["id não numérico", "abc"],
            ["id undefined", undefined],
            ["id é null", null]
        ])("Deve retornar erro 400, %s", async (_, id: any) => {
            const res = await sut(id);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
        test("Deve retornar erro 404 pois id não foi encontrado", async () => {
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
