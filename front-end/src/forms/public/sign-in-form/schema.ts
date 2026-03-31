import z from "zod";

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(4)
}).strict()

export type ISignInValues = z.infer<typeof signInSchema>