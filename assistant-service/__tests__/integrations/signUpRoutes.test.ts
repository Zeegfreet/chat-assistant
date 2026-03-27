import { DbConnection } from "@db/db/config/dbConnection";
import request from "supertest";
import TestAgent from "supertest/lib/agent";
import { dbConfig } from "@app/config/dbConfig";
import { createApp } from "@app/app";
import { hashFactory } from "@app/factories/criptography/hashFactory";
import { QueryRunner } from "typeorm";

let api: TestAgent;
let manager: QueryRunner;

beforeAll( async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());

    const app = await createApp();
    api = request(app);
});

beforeEach( async () => {

    const db = DbConnection.getInstance();
    manager = await db.createManager();
    await manager.startTransaction();
    db.setManager(manager);

    const userRepository = DbConnection.getInstance().getCollection("User");
    const hasher = hashFactory();

    try {
        const usuarioTeste = await userRepository.create({
            id: 10,
            name: "Usuario Teste Fixo",
            email: "testefixo@teste.com.br",
            password: await hasher.hash("@SenhaMock1")
        });
        const usuarioTeste2 = await userRepository.create({
            id: 99,
            name: "Usuario Teste 99",
            email: "testefixo99@teste.com.br",
            password: await hasher.hash("@SenhaMock1")
        });
        await userRepository.save(usuarioTeste);
        await userRepository.save(usuarioTeste2);
        
    } catch (_) {
        // await Promise.resolve();
    }
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

/* --------- MOCKS --------- */

const signUpRoute = "/auth/signup";

/* --------- TESTS --------- */

describe("Testa rota /SIGNUP método POST", () => {
    const mockNewUser = {
        name: "Mock User",
        email: "teste@mock.mc",
        password: "@1SenhaValida"
    };
    describe("Casos de Sucesso", () => {

        test("Deve retornar com status 201", async () => {
            const response = await api.post(signUpRoute).send(mockNewUser);
            expect(response.status).toBe(201);
        });

        test("Deve retornar atribute success: true e resources na resposta", async () => {
            const response = await api.post(signUpRoute).send(mockNewUser);
            expect(response.body).toHaveProperty("success");
            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty("resources");
        });

        test("Deve retornar com os dados do usuário enviado", async () => {
                
            const expectedResponseObject = {
                name: mockNewUser.name,
                email: mockNewUser.email
            };

            const response = await api.post(signUpRoute).send(mockNewUser);

            expect(response.body.resources).toMatchObject(expectedResponseObject);
                
        });

        test("Não deve retornar dados senssíveis (password, isAdmin, isBlocked, deletedAt)", async () => {
            const response = await api.post(signUpRoute).send(mockNewUser);
            expect(response.body.resources).not.toHaveProperty("password");
            expect(response.body.resources).not.toHaveProperty("isAdmin");
            expect(response.body.resources).not.toHaveProperty("isBlocked");
            expect(response.body.resources).not.toHaveProperty("deletedAt");
            expect(response.body.resources).not.toHaveProperty("isDeleted");
        });

        test("Deve retornar modelo de dados correto do usuário", async () => {
            const response = await api.post(signUpRoute).send(mockNewUser);
            expect(response.body.resources).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            );
        }); 
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["name", { email: mockNewUser.email, password: mockNewUser.password }],
            ["email", { name: mockNewUser.name, password: mockNewUser.password }],
            ["password", { name: mockNewUser.name, email: mockNewUser.email }],
        ])("Deve retornar erro 400 pela ausência do atributo %s", async (_, dto) => {
            const response = await api.post(signUpRoute).send(dto);
            expect(response.statusCode).toBe(400);
        });

        test.each([
            ["name", { email: mockNewUser.email, password: mockNewUser.password }],
            ["email", { name: mockNewUser.name, password: mockNewUser.password }],
            ["password", { name: mockNewUser.name, email: mockNewUser.email }],
        ])("Deve retornar erro estruturado com success, error e message %s", async (atributo, dto) => {
            const response = await api.post(signUpRoute).send(dto);
            expect(response.body.message).toEqual(expect.stringContaining(atributo));
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: false,
                    error: expect.any(String),
                    message: expect.any(String)
                })
            );
        });

        test("Deve retornar Erro 409 pois e-mail já está cadastrado", async () => {
            await api.post(signUpRoute).send(mockNewUser);
            const response = await api.post(signUpRoute).send(mockNewUser);
            expect(response.statusCode).toBe(409);
            expect(response.body.message).toContain("email");
        });

        test("Não deve retornar dados de usuário em caso de insucesso", async () => {

            const dto = {
                name: mockNewUser.name,
                email: mockNewUser.email
            };

            const response = await api.post(signUpRoute).send(dto);

            expect(response.body).not.toHaveProperty("resources");
        });

        test("Deve retornar objeto success: false, error e message na resposta em casos de error", async () => {
            await api.post(signUpRoute).send(mockNewUser);
            const response = await api.post(signUpRoute).send(mockNewUser);
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: false,
                    error: expect.any(String),
                    message: expect.any(String)
                })
            );
        });

        test("Deve retornar erro 400 e mensagem caso email inválido", async () => {
            const mockDto = {
                ...mockNewUser,
                email: "inválido"
            };

            const response = await api.post(signUpRoute).send(mockDto);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");

        });

        test("Deve retornar erro 400 e mensagem caso nome inválido", async () => {
            const mockDto = {
                ...mockNewUser,
                name: "yu"
            };

            const response = await api.post(signUpRoute).send(mockDto);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");

        });
        
        test("Deve retornar erro 400 e mensagem caso senha inválida", async () => {
            const mockDto = {
                ...mockNewUser,
                password: "minhaSenhaInválida"
            };

            const response = await api.post(signUpRoute).send(mockDto);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");

        });

        test.each([
            ["possui menos de 8 caracteres", { password: "@1senha" }],
            ["não contem 1 letra maiúscula", { password: "@senhaforte1" }],
            ["não contém 1 letra minúscula", { password: "@SENHAFORTE1" }],
            ["não contém caractere especial", { password: "Senhaforte1" }],
            ["possui mais de 16 caracteres", { password: "@Senhafortedemais1" }]
        ])("Deve rejeitar o cadastro pois senha %s", async (_, mockAttributes) => {
            const mockDto = {
                ...mockNewUser,
                ...mockAttributes
            };

            const response = await api.post(signUpRoute).send(mockDto);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");

        });
    });
        
});