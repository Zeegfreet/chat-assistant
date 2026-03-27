import z from "zod";

export const updatePermissionSchema = z.object({
    resource: z.string().min(3).max(25),
    method: z.enum(["CREATE", "READ", "UPDATE", "DELETE"])
})
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "No data received in request, body is required."
    });