
import z from "zod";

const signedId = z.object({
    id: z.number()
}).strict();

export const signedSchema = z.object({
    url: z.url(),
    headers: z.any().optional()
});

export const agentSchema = z.object({
    name: z.string().min(3).max(50),
    slug: z.string().min(6).max(25),
    model: z.enum(["gemini-3.1-flash-lite-preview"]),
    isActive: z.boolean().optional(),
    provider: z.enum(["gemini"]),
    prompt: z.string(),
    credentials: z.object({
        id: z.number()
    }).optional(),
    signeds: z.array(z.union([signedSchema.strict(), signedId])).optional()
});

export type IAgentSchema = z.infer<typeof agentSchema>