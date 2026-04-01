import z from "zod";

export const createCredentialSchema = z.object({
    name: z.string().min(3).max(50),
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    code: z.string().optional(),
    accountId: z.string().optional(),
});

export type ICreateCredentialSchema = z.infer<typeof createCredentialSchema>