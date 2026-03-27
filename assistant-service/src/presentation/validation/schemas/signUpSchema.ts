import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, {
        message: " password must contain 1 number (0-9), 1 uppercase letters, 1 lowercase letters, 1 non-alpha numeric number, 8-16 characters with no space"
    })
});