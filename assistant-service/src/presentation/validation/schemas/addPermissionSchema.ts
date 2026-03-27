import z from "zod";

export const addPermissionSchema = z.object({
    resource: z.string().min(3).max(25),
    method: z.enum(["CREATE", "READ", "UPDATE", "DELETE"])
});