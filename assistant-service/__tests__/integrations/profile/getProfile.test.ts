import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
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

    const db = DbConnection.getInstance();
    manager = await db.createManager();
    await manager.startTransaction();

    db.setManager(manager);
    
    const userRepository = DbConnection.getInstance().getCollection("User");

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
    
});

afterAll( async () => {
    await manager.rollbackTransaction();
    await manager.release();

    DbConnection.getInstance().setManager(undefined);

    await DbConnection
        .getInstance()
        .disconnect();
});

/* ---------- SUT --------- */

const makeSut = () => request.get("/v1/profile")
    .set("authorization", `Bearer ${accessToken}`);

/* --------- TESTS ---------- */

describe("Testa rota /PROFILE método GET", () => {
    test("Deve retornar status 200", async ( ) => {
        const res = await makeSut();

        expect(res.statusCode).toBe(200);
    });
    test("Deve retornar modelo de sucesso correto", async ( ) => {
        const res = await makeSut();

        expect(res.body).toHaveProperty("success");
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty("resources");
    });

    test("Deve retornar os dados do usuário logado", async ( ) => {
        const res = await makeSut();

        expect(res.body.resources).toEqual({
            id: expect.any(Number),
            name: "Joh Doe",
            email: "john@doe.com.br"
        });

    });

    test("Não deve retornar dados senssíveis", async ( ) => {
        const res = await makeSut();

        expect(res.body.resources).not.toHaveProperty("password");
        expect(res.body.resources).not.toHaveProperty("isAdmin");
        expect(res.body.resources).not.toHaveProperty("isActive");
        expect(res.body.resources).not.toHaveProperty("isBlocked");
        expect(res.body.resources).not.toHaveProperty("isVerified");

    });

    test("Deve retornar erro 401 pois usuário não está logado", async ( ) => {
        const res = await makeSut()
            .unset("authorization");

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("success");
        expect(res.body.success).toBe(false);
        expect(res.body).toHaveProperty("message");

    });
});