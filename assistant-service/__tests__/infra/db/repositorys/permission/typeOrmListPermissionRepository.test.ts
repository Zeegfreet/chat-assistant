import { dbConfig } from "@app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import { TypeOrmSearchHelper } from "@db/db/repositories/helper/typeOrmSearchHelper";
import { TypeOrmListPermissionRepository } from "@db/db/repositories/permission/typeOrmListPermissionRepository";
import { SearchParams } from "@domain/index";
import { Permission } from "@src/entitys/permission.entity";

beforeAll(async () => {
    await DbConnection
        .getInstance()
        .connect(dbConfig());
});

beforeEach(async () => {
    const permissionRepository = DbConnection
        .getInstance()
        .getCollection(Permission);
    
    await permissionRepository.clear();
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

afterAll(async () => {
    await DbConnection
        .getInstance()
        .disconnect();
});

/* --------- MOCK -------- */

const makeMock = (params: Partial<SearchParams> = {}): SearchParams => ({
    page: 1,
    limit: 100,
    search: "",
    filter: {},
    order: {},
    ...params
});

/* ---------- SUT ---------- */

const makeSut = () => {
    const searchHelper = new TypeOrmSearchHelper(
        ["resource", "method"],
        ["id", "resource", "method", "createdAt", "updatedAt"],
        ["id", "resource", "method", "createdAt", "updatedAt"]
    );
    const sut = new TypeOrmListPermissionRepository(
        searchHelper
    );

    return {
        searchHelper,
        sut
    };
};

/* --------- TESTS --------- */

describe("Testa TypeOrmListPermissionRepository", () => {
    describe("Casos de sucesso", () => {
        test("Deve retornar apenas dados que contenham conteúdo de search", async () => {
            const mockPayload = makeMock({ search: "CREA" });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        resource: "PERMISSION",
                        method: "CREATE"
                    }),
                    expect.objectContaining({
                        method: "CREANDO"
                    })
                ])
            );

        });

        test("Deve retornar a quantidade de páginas disponíveis", async () => {
            const mockPayload = makeMock({ limit: 5 });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.totalPages).toBe(3);
            expect(permissions.currentPage).toBe(1);

        });

        test("Deve retornar dados mesmo se search for parcialmente igual", async () => {
            const mockPayload = makeMock({ search: "PERM" });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        resource: "PERMISSION",
                    })
                ])
            );

        });

        test("Deve retornar dados ignorando UpperCase e LowerCase pelo campo search", async () => {
            const mockPayload = makeMock({ search: "perm" });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        resource: "PERMISSION",
                    })
                ])
            );

        });

        test("Deve retornar dados estritos se filter for informado", async () => {
            const mockPayload = makeMock({ filter: { resource: "USERS" } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        resource: "USERS",
                    })
                ])
            );

        });

        test("Deve permitir vários critérios em filter", async () => {
            const mockPayload = makeMock({ filter: { resource: "USERS", method: "CREATE" } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data.length).toBe(1);
            expect(permissions.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        resource: "USERS",
                        method: "CREATE"
                    })
                ])
            );

        });

        test("Deve executar filtro por filter e search em conjunto sem sobreposição", async () => {
            const mockPayload = makeMock({ search: "CREA", filter: { resource: "USERS" } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data.length).toBe(1);
            expect(permissions.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        resource: "USERS",
                        method: "CREATE"
                    })
                ])
            );

        });

        test("Deve executar ordenação se order for informado", async () => {
            const mockPayload = makeMock({ order: { id: "DESC" } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data[0]).toEqual(
                expect.objectContaining({
                    id: 12
                })
            );
        });

        test("Deve ordenar a partir de vários critérios se informados", async () => {
            const mockPayload = makeMock({ order: { resource: "ASC", method: "ASC" } });
            
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data[0]).toEqual(
                expect.objectContaining({
                    id: 9
                })
            );
        });

        test("Deve retornar apenas a quantidade de dados especificada em limit", async () => {
            
            const mockPayload = makeMock({ limit: 3 });
            
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data.length).toBe(3);
        });

        test("Deve saltar dados já exibidos se página for alterada", async () => {
            const firstPagePayload = makeMock({
                limit: 2,
                page: 1
            });

            const currentPagePayload = makeMock({
                limit: 2,
                page: 2
            });
            
            const { sut } = makeSut();

            const page1 = await sut.list(firstPagePayload);
            const response = await sut.list(currentPagePayload);

            expect(response).not.toEqual(page1);
        });

        test("Deve retornar apenas registros com id maior que 6", async () => {
            const mockPayload = makeMock({ filter: { id: { $gt: 6 } } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            const minId = Math.min(...permissions.data.map(permission => permission.id));

            expect(minId).toBe(7);
            expect(permissions.data.length).toBeGreaterThan(2);

        });

        test("Deve retornar apenas registros com id maior ou igual a 6", async () => {
            const mockPayload = makeMock({ filter: { id: { $gte: 6 } } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            const minId = Math.min(...permissions.data.map(permission => permission.id));

            expect(minId).toBe(6);
            expect(permissions.data.length).toBeGreaterThan(2);

        });

        test("Deve retornar apenas registros com id menor que 6", async () => {
            const mockPayload = makeMock({ filter: { id: { $lt: 6 } } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            const maxId = Math.max(...permissions.data.map(permission => permission.id));
            const minId = Math.min(...permissions.data.map(permission => permission.id));

            expect(maxId).toBe(5);
            expect(minId).toBe(1);

        });

        test("Deve retornar apenas registros com id menor que ou igual a 6", async () => {
            const mockPayload = makeMock({ filter: { id: { $lte: 6 } } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            const maxId = Math.max(...permissions.data.map(permission => permission.id));
            const minId = Math.min(...permissions.data.map(permission => permission.id));

            expect(maxId).toBe(6);
            expect(minId).toBe(1);

        });

        test("Deve retornar apenas registros com id entre 3 e 8", async () => {
            const mockPayload = makeMock({ filter: { id: { $between: [3, 8] } } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            const maxId = Math.max(...permissions.data.map(permission => permission.id));
            const minId = Math.min(...permissions.data.map(permission => permission.id));

            expect(maxId).toBe(8);
            expect(minId).toBe(3);

        });

        test("Deve retornar apenas registros com os ids 3, 6 e 9", async () => {
            const mockPayload = makeMock({ filter: { id: { $in: [3, 6, 9] } } });
            const { sut } = makeSut();

            const permissions = await sut.list(mockPayload);

            expect(permissions.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 3
                    }),
                    expect.objectContaining({
                        id: 6
                    }),
                    expect.objectContaining({
                        id: 9
                    }),
                ])
            );

        });
        
    });

    describe("Edge cases", () => {
        test("Deve retornar 1 páginas se nada for encontrado", async () => {
            const mockPayload = makeMock({ filter:{ method: "INEXISTENTE" } });
            const { sut } = makeSut();

            const response = await sut.list(mockPayload);

            expect(response.totalPages).toBe(1);
        });
        test("Deve retornar array vazio caso nada for encontrado", async () => {
            const mockPayload = makeMock({ filter:{ method: "INEXISTENTE" } });
            const { sut } = makeSut();

            const response = await sut.list(mockPayload);

            expect(response.data).toStrictEqual([]);
        });
    });
});