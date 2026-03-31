import z from "zod";


export const profileSchema = z.object({
    name: z.string().min(3).max(50),
})

export type IProfileSchema =  z.infer<typeof profileSchema>