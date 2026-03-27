export class DbError extends Error {
    constructor(
    public readonly reason: "unique" | "foreign_key",
    public readonly constraint?: string
    ) {
        super("Conflito de dados");
        this.name = "ConflictError";
    }
}