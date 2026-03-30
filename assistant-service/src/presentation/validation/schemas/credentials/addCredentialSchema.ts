import z from "zod";

export const addCredentialSchema = z.object({
    name: z.string().min(3).max(50),
    accessToken: z.string().nullish().optional(),
    refreshToken: z.string().nullish().optional(),
    code: z.string().nullish().optional(),
    accountId: z.string().nullish().optional(),
});