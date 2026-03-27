import z from "zod";

export const associationSchema = z.object({
    id: z.number(),
}).catchall(z.any());