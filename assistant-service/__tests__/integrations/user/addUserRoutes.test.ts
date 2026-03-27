import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Role } from "@src/entitys/role.entity";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import crypto from "crypto";
import { User } from "@src/entitys/user.entity";
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
        name: "Joh Doe",
        email: "john@doe.com.br",
        password: "$2b$04$HSpE9khsw/2t9Xmrp0PgweyNdjVR8126KQyqp6gmzzVt5QTFDEzH6",
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

/* ---------- MOCK --------- */

const makeMock = (payload: Record<any, any> = {}) => ({
    name: "John Deep",
    email: "john@deep.com.br",
    password: "@JhonDeep1",
    ...payload
});

function gerarStringLonga(tamanho = 55) {
    // Gera bytes aleatórios e converte para hexadecimal
    return crypto
        .randomBytes(Math.ceil(tamanho / 2))
        .toString("hex")
        .slice(0, tamanho);
}
/* ---------- SUT --------- */

const sut = (payload: any) => request.post("/admin/user")
    .set("Authorization", `Bearer ${accessToken}`)
    .send(payload);

/* ---------- TESTS --------- */

describe("Testa rota /USER método POST", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar status 201", async () => {
            const payload = makeMock();
            
            const res = await sut(payload);

            expect(res.statusCode).toBe(201);
            
        });
        test("Deve retornar com modelo success: true e resources", async () => {
            const payload = makeMock();
            
            const res = await sut(payload);

            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty("resources");
        });
        test("Deve retornar os mesmos dados do usuário enviado na requisição", async () => {
            const payload = makeMock();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...payloadWithoutPassword } = payload;
            
            const res = await sut(payload);

            expect(res.body.resources).toMatchObject(payloadWithoutPassword);
            
        });
        test("Deve associar Roles se enviado na requisição", async () => {
            const payload = makeMock({
                roles: [{id: 1}]
            }) as any;
            
            const res = await sut(payload);

            const roles: Role[] = res.body.resources.roles;

            const rolesReceiveds = roles.map(role => ({ id: role.id }));
            
            expect(rolesReceiveds).toStrictEqual(payload.roles);
        });
        test("Deve persistir os dados no banco", async () => {
            const payload = makeMock();
            const { email } = payload;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...payloadWithoutPassword } = payload;
            const repo = DbConnection.getInstance().getCollection(User);
            
            await sut(payload);

            const res = await repo.findOneBy({ email });

            expect(res).toMatchObject(payloadWithoutPassword);
            
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["body vazio", {  }],
            ["email inválido", { ...makeMock(), email: "john.deep.com.br" }],
            ["password sem letra maiúscula", { ...makeMock(), password: "@jhondeep1" }],
            ["password sem letra minúscula", { ...makeMock(), password: "@JHONDEEP1" }],
            ["password sem número", { ...makeMock(), password: "@JhonDeep" }],
            ["password com menos de 8 caracteres", { ...makeMock(), password: "@Jh1" }],
            ["password com mais de 16 caracteres", { ...makeMock(), password: gerarStringLonga(17) }],
            ["password com espaço", { ...makeMock(), password: "@Jhon Deep1" }],
            ["password sem caractere especial", { ...makeMock(), password: "JhonDeep1" }],
            ["name com menos de 3 caracteres", { ...makeMock(), name: "Jo" }],
            ["name com mais de 50 caracteres", { ...makeMock(), name: gerarStringLonga(51) }],
            ["isActive com valor não booleano", { ...makeMock(), isActive: "true" }],
            ["isAdmin com valor não booleano", { ...makeMock(), isAdmin: "true" }],
            ["isBlocked com valor não booleano", { ...makeMock(), isBlocked: "true" }],
            ["isVerified com valor não booleano", { ...makeMock(), isVerified: "true" }],
        ])("Deve retornar status 400, %s", async (_, payload) => {
            const res = await sut(payload);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar erro 401, pois usuário não está logado", async () => {
            const payload = makeMock();
            
            const res = await sut(payload)
                .unset("Authorization");

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar erro 409, email utilizado já tem cadastro anterior", async () => {
            const payload = makeMock();
            
            await sut(payload);
            const res = await sut(payload);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar erro 404, pois foi recebido id de role que não tem cadastro", async () => {
            const payload = makeMock({
                roles: [{ id: 99 }]
            });
            
            const res = await sut(payload);

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
    });
});