import { PageLoader } from "@/components/PageLoader"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"
import { changeEmailSchema } from "./schema"


export const ChangeEmailForm: React.FC = () => {
    const { t } = useTranslation("forms");
    const form = useForm({
        resolver: zodResolver(changeEmailSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            emailConfirm: ''
        }

    })

    const handleSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <PageLoader>
            <form
                className="flex flex-col gap-2"
                onSubmit={form.handleSubmit(handleSubmit)}
             >
                <Controller 
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("signup.email")}
                            </FieldLabel>
                            <FieldContent>
                                <Input 
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller 
                    name="emailConfirm"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                {t("signup.confirm email")}
                            </FieldLabel>
                            <FieldContent>
                                <Input 
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />
                            </FieldContent>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <div>
                    <Button
                        type="submit"
                        className="min-w-40"
                        variant="outline"
                    >
                        <SaveIcon /> {t("save")}
                    </Button>
                </div>
            </form>
        </PageLoader>
    )
}