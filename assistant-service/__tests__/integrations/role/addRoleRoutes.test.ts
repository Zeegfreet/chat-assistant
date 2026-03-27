import { createApp } from "@app/app";
import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { Permission } from "@src/entitys/permission.entity";
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
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);

    const permission1 = permissionRepository.create({
        id: 1,
        resource: "TEST",
        method: "CREATE"
    });
    const permission2 = permissionRepository.create({
        id: 2,
        resource: "TEST",
        method: "UPDATE"
    });

    await permissionRepository.save(permission1);
    await permissionRepository.save(permission2);

    const testRoles: Role[]  = [
        {
            id: 1,
            role: "Tester",
            description: "Testar o sistema",
            isActive: true,
            isDefault: false,
            permissions: [permission1, permission2],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    await roleRepository.insert(testRoles);
        
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
    role: "New Tester",
    description: "Testar a criação de uma nova role",
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

const sut = (payload: any) => request.post("/admin/role")
    .set("Authorization", `Bearer ${accessToken}`)
    .send(payload);

/* ---------- TESTS --------- */

describe("Testa rota /ROLE método POST", () => {
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
        test("Deve retornar os dados da Role enviada na requisição", async () => {
            const payload = makeMock();
            
            const res = await sut(payload);

            expect(res.body.resources).toMatchObject(payload);
            
        });
        test("Deve associar permissions se os ids forem enviados no objeto permissions", async () => {
            const payload = makeMock({
                permissions: [{id: 1}, {id: 2}]
            }) as any;
            
            const res = await sut(payload);

            const permissions: Permission[] = res.body.resources.permissions;

            const permissionsReceiveds = permissions.map(permission => ({ id: permission.id }));

            expect(permissionsReceiveds).toStrictEqual(payload.permissions);
        });
        test("Deve persistir os dados no banco", async () => {
            const payload = makeMock();
            const repo = DbConnection.getInstance().getCollection(Role);
            
            await sut(payload);

            const res = await repo.findOneBy(payload);

            expect(res.role).toBe(payload.role);
            
        });
    });
    describe("Casos de insucesso", () => {
        test.each([
            ["body vazio", {  }],
            ["role não é string", { role: 1, description: "Descrição válida" }],
            ["description não é string", { role: "Role Válida", description: true }],
            ["description não enviada", { role: "Role Válida" }],
            ["role não enviada", { description: "Descrição válida" }],
            ["role com menos de 5 dígitos", { role: "tr", description: "Descrição válida"  }],
            ["role com mais de 50 dígitos", { role: gerarStringLonga(), description: "Descrição válida"  }],
            ["description com menos de 5 dígitos", { role: "Role Válida", description: "quat"  }],
            ["description com menos de 250 dígitos", { role: "Role Válida", description: gerarStringLonga(251)  }],
            ["isActive string", { role: "Role Válida", description: "Descrição válida", isActive: "sim"  }],
            ["isDefault string", { role: "Role Válida", description: "Descrição válida", isDefault: "sim"  }],
            ["permissions string", { role: "Role Válida", description: "Descrição válida", permissions: "CREATE"  }],
            ["permissions array de números", { role: "Role Válida", description: "Descrição válida", permissions: [2,3,5]  }],
            ["objetos em permissions não possuem id", { role: "Role Válida", description: "Descrição válida", permissions: [{ resource: "PERMISSION" }]  }],
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

        test("Deve retornar erro 409, role recebida já possui cadastro", async () => {
            const payload = makeMock();
            
            await sut(payload);
            const res = await sut(payload);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });

        test("Deve retornar erro 409, pois foi recebido id de permission que não tem cadastro", async () => {
            const payload = makeMock({
                permissions: [{ id: 99 }]
            });
            
            await sut(payload);
            const res = await sut(payload);

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty("success");
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty("error");
            expect(res.body).toHaveProperty("message");
        });
    });
});