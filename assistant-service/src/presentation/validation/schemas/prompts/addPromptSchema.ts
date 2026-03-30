import z from "zod";

export const addPromptSchema = z.object({
    name: z.string().min(3).max(50),
    prompt: z.string().min(10).max(500)
});