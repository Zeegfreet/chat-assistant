
import z from "zod";

const signedId  = z.object({
    id: z.number()
}).strict();

export const agentSchema = z.object({
    name: z.string().min(3).max(50),
    slug: z.string(),
    model: z.enum(["gemini-3.1-flash-lite-preview"]),
    isActive: z.boolean().optional(),
    provider: z.enum(["gemini"]),
    prompt: z.string(),
    credentials: z.object({
        id: z.number()
    }).optional(),
    // signeds: z.array(z.union([addSignedSchema.strict(), signedId])).optional()
});

export type IAgentSchema = z.infer<typeof agentSchema>