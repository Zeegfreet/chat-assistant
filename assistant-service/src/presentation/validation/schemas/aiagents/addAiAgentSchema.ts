import z from "zod";

export const addAiAgentSchema = z.object({
    name: z.string().min(3).max(50),
    slug: z.string(),
    model: z.string(),
    isActive: z.boolean().optional(),
    provider: z.enum(["gemini"])
});