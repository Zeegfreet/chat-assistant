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

    await roleRepository.save(testRole);

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

    await userRepository.save(testUser);
        
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

const sut = (id: string | number) => request.delete(`/admin/user/${id}`)
    .set("Authorization", `Bearer ${accessToken}`);

/* ---------- TESTS --------- */

describe("Testa rota /USER método DELETE", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar status 204, sem body", async () => {
            const id = 1;
            const res = await sut(id);

            expect(res.statusCode).toBe(204);
        });

        test("Deve persistir a alteração no banco", async () => {
            const id = 1;
            const repo = DbConnection.getInstance().getCollection(User);
            
            await sut(id);

            const findUserByPk = await repo.findOneBy({ id });

            expect(findUserByPk).toBeNull();
        });

        test("Deve deletar de forma soft delete", async () => {
            const id = 1;
            const repo = DbConnection.getInstance().getCollection(User);
            
            await sut(id);
            
            const findUserWithDeleted = await repo.findOne({
                where: { id },
                withDeleted: true
            });
            expect(findUserWithDeleted).not.toBeNull();
            expect(findUserWithDeleted?.deletedAt).not.toBeNull();
        });

        test("softDelete deve alterar isDeleted para true", async () => {
            const id = 1;
            const repo = DbConnection.getInstance().getCollection(User);
            
            await sut(id);
            
            const findUserWithDeleted = await repo.findOne({
                where: { id },
                withDeleted: true
            });

            expect(findUserWithDeleted).not.toBeNull();
            expect(findUserWithDeleted?.isDeleted).toBe(true);
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

        test("Deve retornar erro 401, pois usuário não está logado", async () => {
            const id = 1;
            const res = await sut(id)
                .unset("Authorization");

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar erro 404 pois id não foi encontrado", async () => {
            const id = 999;
            const res = await sut(id);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar erro 409 pois usuãrio não deletar o próprio cadastro", async () => {
            const id = 99;
            const res = await sut(id);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
    });

});
