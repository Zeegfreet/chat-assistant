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

/* --------- MOCK ---------- */

const makeMock = (data?: any) => ({
    
    resource: "TEST",
    method: "CREATE",
    ...data,
});

/* ---------- SUT --------- */

const makeRequest = () => request.post("/admin/permission")
    .set("authorization", `Bearer ${accessToken}`);

/* ---------- TEST ---------- */

describe("Testa rota /PERMISSION, método POST", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar status 201", async () => {
            const mockPayload = makeMock();

            const req = await makeRequest()
                .send(mockPayload);
            
            expect(req.status).toBe(201);
        });

        test("O retorno deve conter os objetos success: true e resources", async () => {
            const mockPayload = makeMock();

            const req = await makeRequest()
                .send(mockPayload);
            
            expect(req.body).toHaveProperty("success");
            expect(req.body).toHaveProperty("resources");
            expect(req.body.success).toBe(true);
        });

        test("Os dados retornados devem ser iguais aos enviados", async () => {
            const mockPayload = makeMock();

            const req = await makeRequest()
                .send(mockPayload);
            
            expect(req.body.resources).toMatchObject(mockPayload);
        });

        test("Deve retornar o modelo de dados correto", async () => {
            const mockPayload = makeMock();

            const req = await makeRequest()
                .send(mockPayload);
            
            expect(req.body.resources).toEqual({
                id: expect.any(Number),
                resource: expect.any(String),
                method: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });

        test("Os campos resource e method devem sempre ser UPPERCASE", async () => {
            const mockPayload = makeMock({
                resource: "lowerresource",
                method: "CREATE"
            });

            const expectedResponse = {
                resource: mockPayload.resource.toUpperCase(),
                method: mockPayload.method.toUpperCase()
            };

            const req = await makeRequest()
                .send(mockPayload);
                        
            expect(req.body.resources).toMatchObject(expectedResponse);
        });

        test("Deve persistir os dados no banco", async () => {
            const mockPayload = makeMock();
            const permissionRepository = DbConnection.getInstance().getCollection(Permission);

            await makeRequest()
                .send(mockPayload);

            const permission = await permissionRepository.findOneBy({ resource: mockPayload.resource as any });

            expect(permission).toMatchObject(mockPayload);
            
        });
        
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["resource inválido", { resource: "RA", method: "CREATE" }],
            ["method inválido", { resource: "ROLE", method: "CR" }],
            ["resource não fornecido", { method: "CREATE" }],
            ["method não fornecido", { resource: "ROLE" }]
        ])("Deve retornar status 400, campo %s", async (_, mockPayload) => {
            const req = await makeRequest()
                .send(mockPayload);
            
            expect(req.status).toBe(400);
            expect(req.body).toHaveProperty("success");
            expect(req.body.success).toBe(false);
            expect(req.body).toHaveProperty("error");
            expect(req.body).toHaveProperty("message");
        });
        test("Deve retornar status 409, permissão já existente", async () => {
            const mockPayload = makeMock();
            await makeRequest()
                .send(mockPayload);
            const req = await makeRequest()
                .send(mockPayload);
            
            expect(req.status).toBe(409);
            expect(req.body).toHaveProperty("success");
            expect(req.body.success).toBe(false);
            expect(req.body).toHaveProperty("error");
            expect(req.body).toHaveProperty("message");
        });
    });
});