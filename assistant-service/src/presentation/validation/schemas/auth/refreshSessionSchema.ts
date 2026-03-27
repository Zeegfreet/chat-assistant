import z from "zod";

export const refreshSessionSchema = z.object({
    refreshToken: z.string()
}).strict();