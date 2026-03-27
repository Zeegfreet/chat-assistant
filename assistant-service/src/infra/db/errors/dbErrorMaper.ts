import { QueryFailedError } from "typeorm";

export type DbConflictType =
  | "unique"
  | "foreign_key";

export type DbErrorDescriptor =
  | { kind: "conflict"; type: DbConflictType; constraint?: string }
  | { kind: "unknown" };

export class DbErrorMapper {
    static map(error: unknown): DbErrorDescriptor {
        if (error instanceof QueryFailedError) {
            const err = error as any;
            // 🔵 POSTGRES
            if (err.code === "23505") {
                return { kind: "conflict", type: "unique", constraint: err.constraint };
            }

            if (err.code === "23503") {
                return { kind: "conflict", type: "foreign_key", constraint: err.constraint };
            }

            // 🟡 SQLITE
            if (typeof err.message === "string") {
                if (err.message.includes("SQLITE_CONSTRAINT")) {
                    if(err.message.includes("UNIQUE")){
                        return { kind: "conflict", type: "unique" };

                    }
                    if(err.message.includes("FOREIGN KEY")){
                        return { kind: "conflict", type: "foreign_key" };
                    }
                }
            }
        }

        return { kind: "unknown" };
    }
}
