import z from "zod";

export const singleIdSchema = z.object({
    id: z.coerce.number()
});