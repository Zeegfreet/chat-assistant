import z from "zod";

export const massIdsSchema = z.object({
    ids: z.array(z.number()).nonempty()
});