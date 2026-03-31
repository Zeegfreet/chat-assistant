import z from "zod";

export const addSignedSchema = z.object({
    url: z.url(),
    headers: z.object({}).optional()
});