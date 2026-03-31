import z from "zod";
import { t } from "i18next";


export const changeEmailSchema = z.object({
    email: z.email(),
    emailConfirm: z.email(),
})
    .strict()
    .refine(values => values.email === values.emailConfirm, {
        message: t("forms:signup.messages.password.email dont matches"),
        path: ["emailConfirm"]
    })

export type IChangeEmailSchema =  z.infer<typeof changeEmailSchema>