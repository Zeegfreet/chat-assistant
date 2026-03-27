import { z } from "zod";

const primitiveSchema = z.union([
    z.string(),
    z.coerce.number(),
    z.boolean(),
    z.iso.date()
]);

const filterOperatorsSchema = z.object({
    $gt: z.any().optional(),
    $gte: z.any().optional(),
    $lt: z.any().optional(),
    $lte: z.any().optional(),
    $between: z.tuple([z.any(), z.any()]).optional(),
    $in: z.array(z.any()).optional()
}).strict();

const filterValueSchema = z.union([
    primitiveSchema,
    filterOperatorsSchema
]);

export const searchSchema = z.object({
    page: z.coerce.number().min(1),
    limit: z.coerce.number().min(1),
    search: z.string(),
    order: z.record(
        z.string(),
        z.enum(["ASC", "DESC"])
    ),
    filter: z.record(
        z.string(),
        filterValueSchema
    )
}).partial();
