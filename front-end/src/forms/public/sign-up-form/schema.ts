import { z } from "zod"
import { t } from "i18next";

export const signUpSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    emailConfirm: z.email(),
    password: z.string()
        .min(8)
        .max(16)
        .refine(val => /[A-Z]/.test(val), { message: t("forms:signup.messages.password.uppercase") })
        .refine(val => /[a-z]/.test(val), { message: t("forms:signup.messages.password.lowercase") })
        .refine(val => /[0-9]/.test(val), { message: t("forms:signup.messages.password.number") })
        .refine(val => /[^a-zA-Z0-9\s]/.test(val), { message: t("forms:signup.messages.password.special") })
        .refine(val => !/[ ]/.test(val), { message: t("forms:signup.messages.password.spaces") }),
    passwordConfirm: z.string()
})
    .strict()
    .refine(values => values.email === values.emailConfirm, {
        message: t("forms:signup.messages.password.email dont matches"),
        path: ["emailConfirm"]
    })
    .refine(values => values.password === values.passwordConfirm, {
        message: t("forms:signup.messages.password.password dont matches"),
        path: ["passwordConfirm"]
    } )

export type ISignupValues =  z.infer<typeof signUpSchema>